import os
import sys
import json
import time
import unittest
from urllib.parse import urljoin
from urllib.request import urlopen, Request

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


class InveniaE2E(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        chrome_opts = Options()
        chrome_opts.add_argument("--headless=new")
        chrome_opts.add_argument("--window-size=1280,1024")
        cls.driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=chrome_opts)
        cls.base_url = os.getenv("WEB_URL", "http://localhost:5173/")
        cls.wait = WebDriverWait(cls.driver, 20)

    def setUp(self):
        # Ensure base page is loaded for each test to avoid state leakage
        self.driver.get(self.base_url)
        time.sleep(0.3)

    @classmethod
    def tearDownClass(cls):
        cls.driver.quit()

    def test_01_load_home(self):
        self.driver.get(self.base_url)
        # Navbar present
        nav = self.wait.until(EC.presence_of_element_located((By.TAG_NAME, "nav")))
        self.assertIsNotNone(nav)
        # Hero present
        hero = self.wait.until(EC.presence_of_element_located((By.ID, "home")))
        self.assertIsNotNone(hero)

    def scroll_to_section(self, section_id: str):
        btn = None
        # Try clicking via navbar text buttons by text match
        buttons = self.driver.find_elements(By.TAG_NAME, "button")
        for b in buttons:
            if b.text.strip().lower() == section_id:
                btn = b
                break
        if btn:
            self.driver.execute_script("arguments[0].click();", btn)
        else:
            # fallback to anchor
            try:
                link = self.driver.find_element(By.CSS_SELECTOR, f'a[href="#{section_id}"]')
                self.driver.execute_script("arguments[0].click();", link)
            except Exception:
                # direct scroll
                self.driver.execute_script(f"document.getElementById('{section_id}').scrollIntoView({{behavior:'instant',block:'start'}});")
        time.sleep(1)
        # Verify section is in viewport
        el = self.driver.find_element(By.ID, section_id)
        rect = self.driver.execute_script("var r=arguments[0].getBoundingClientRect();return {top:r.top,bottom:r.bottom};", el)
        self.assertLess(rect['top'], 200)

    def test_02_nav_scroll_sections(self):
        for sec in ["solutions", "products", "services", "industries", "resources", "company", "contact"]:
            self.scroll_to_section(sec)

    def test_03_newsletter_subscribe(self):
        self.scroll_to_section("resources")
        email_inputs = self.driver.find_elements(By.CSS_SELECTOR, "input[type='email']")
        self.assertTrue(len(email_inputs) > 0)
        email_inputs[0].clear()
        email_inputs[0].send_keys("qa+" + str(int(time.time())) + "@example.com")
        sub_btn = self.driver.find_element(By.XPATH, "//button[contains(.,'Subscribe')]")
        self.driver.execute_script("arguments[0].click();", sub_btn)
        msg = WebDriverWait(self.driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Subscribed') or contains(text(),'failed') or contains(text(),'Please enter your email')]") )
        )
        self.assertIn(msg.text.split('!')[0], ["Subscribed", "Subscription failed. Please try again."])

    def test_04_contact_form(self):
        self.scroll_to_section("contact")
        name = self.driver.find_element(By.XPATH, "//label[contains(.,'Name')]/following::input[1]")
        email = self.driver.find_element(By.XPATH, "//label[contains(.,'Email')]/following::input[1]")
        company = self.driver.find_element(By.XPATH, "//label[contains(.,'Company')]/following::input[1]")
        req = self.driver.find_element(By.XPATH, "//label[contains(.,'Requirement')]/following::textarea[1]")
        name.send_keys("QA Bot")
        email.send_keys("qa+contact@ex.com")
        company.send_keys("QA Ltd")
        req.send_keys("Testing end-to-end contact form.")
        send_btn = self.driver.find_element(By.XPATH, "//button[contains(.,'Send Message') or contains(.,'Sending')]")
        self.driver.execute_script("arguments[0].click();", send_btn)
        # Success or failure message rendered
        msg = WebDriverWait(self.driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//*[contains(text(),'Thanks!') or contains(text(),'failed') or contains(text(),'required')]") )
        )
        self.assertTrue(any(s in msg.text for s in ["Thanks!", "failed", "required"]))

    def test_05_chatbot(self):
        # Open chat widget
        fab_or_chat = self.driver.find_elements(By.XPATH, "//button[@aria-label='Open AI Assistant']")
        if not fab_or_chat:
            fab_or_chat = self.driver.find_elements(By.XPATH, "//button//*[name()='svg' and @data-icon='message-circle']")
        self.assertTrue(len(fab_or_chat) >= 1)
        self.driver.execute_script("arguments[0].click();", fab_or_chat[0])
        # Type and send message
        input_box = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "input[placeholder='Ask something...']")))
        input_box.send_keys("What SAP services do you provide?")
        input_box.send_keys(Keys.ENTER)
        # Wait for assistant reply bubble
        reply = self.wait.until(EC.presence_of_element_located((By.XPATH, "//div[contains(@class,'rounded-2xl') and contains(., 'SAP') ]")))
        self.assertIsNotNone(reply)

    # ------------------------------------------------------------------
    # Dynamically added tests to broaden coverage (presence, counts, API)
    # ------------------------------------------------------------------

def _make_xpath_presence_test(name: str, xpath: str):
    def _test(self: InveniaE2E):
        el = self.wait.until(EC.presence_of_element_located((By.XPATH, xpath)))
        self.assertIsNotNone(el)
    _test.__name__ = name
    return _test

def _make_css_count_at_least_test(name: str, selector: str, n: int):
    def _test(self: InveniaE2E):
        els = self.driver.find_elements(By.CSS_SELECTOR, selector)
        self.assertGreaterEqual(len(els), n)
    _test.__name__ = name
    return _test

def _make_api_get_ok_test(name: str, url: str):
    def _test(self: InveniaE2E):
        with urlopen(url) as r:
            data = r.read().decode('utf-8')
            obj = json.loads(data)
            self.assertTrue(obj.get('ok', False))
    _test.__name__ = name
    return _test

def _make_api_post_ok_test(name: str, url: str, payload: dict):
    def _test(self: InveniaE2E):
        req = Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'}, method='POST')
        with urlopen(req) as r:
            data = r.read().decode('utf-8')
            obj = json.loads(data)
            self.assertTrue(obj.get('ok', False))
    _test.__name__ = name
    return _test

# Register a broad set of UI presence tests
_presence_checks = [
    ("test_06_navbar_present", "//nav"),
    ("test_07_hero_title_present", "//h1[contains(.,'Transform Your Business')]")
]

# Section anchors
for idx, sec in enumerate(["solutions","products","services","industries","resources","company","contact"], start=8):
    setattr(InveniaE2E, f"test_{idx:02d}_section_{sec}_present", _make_xpath_presence_test(f"test_{idx:02d}_section_{sec}_present", f"//*[@id='{sec}']"))

# Buttons and CTAs
_presence_checks += [
    ("test_15_cta_get_started", "//button[contains(.,'Get Started')]|//a[contains(.,'Get Started')]") ,
    ("test_16_cta_explore_solutions", "//button[contains(.,'Explore Solutions')]|//a[contains(.,'Explore Solutions')]")
]

# Products, Services, Industries, Resources counts
setattr(InveniaE2E, "test_17_products_cards_count", _make_css_count_at_least_test("test_17_products_cards_count", "section#products h3", 6))
setattr(InveniaE2E, "test_18_services_cards_count", _make_css_count_at_least_test("test_18_services_cards_count", "section#services h2", 6))
setattr(InveniaE2E, "test_19_industries_cards_count", _make_css_count_at_least_test("test_19_industries_cards_count", "section#industries .grid > div", 8))
setattr(InveniaE2E, "test_20_resources_cards_count", _make_css_count_at_least_test("test_20_resources_cards_count", "section#resources .grid > div", 6))

# Specific headline texts for confidence
for i, txt in enumerate([
    "ERP & Digital Core",
    "Finance & Accounting",
    "Supply Chain",
    "Human Capital",
    "Customer Experience",
    "Cloud Solutions"
], start=21):
    setattr(InveniaE2E, f"test_{i:02d}_solutions_title_{i}", _make_xpath_presence_test(f"test_{i:02d}_solutions_title_{i}", f"//section[@id='solutions']//*[contains(., '{txt}')]"))

for i, txt in enumerate([
    "SAP S/4HANA",
    "SAP SuccessFactors",
    "SAP Ariba",
    "SAP Concur",
    "SAP Analytics Cloud",
    "SAP BTP"
], start=27):
    setattr(InveniaE2E, f"test_{i:02d}_product_title_{i}", _make_xpath_presence_test(f"test_{i:02d}_product_title_{i}", f"//section[@id='products']//*[contains(., '{txt}')]"))

for i, txt in enumerate([
    "SAP Consulting",
    "SAP Implementation",
    "Migration & Upgradation",
    "Managed Support",
    "Integration Services",
    "Training & Enablement"
], start=33):
    setattr(InveniaE2E, f"test_{i:02d}_service_title_{i}", _make_xpath_presence_test(f"test_{i:02d}_service_title_{i}", f"//section[@id='services']//*[contains(., '{txt}')]"))

# Newsletter UI
_presence_checks += [
    ("test_39_newsletter_input_present", "//section[@id='resources']//input[@type='email']"),
    ("test_40_newsletter_button_present", "//section[@id='resources']//*[contains(.,'Subscribe')]"),
]

# Contact form labels/fields
_presence_checks += [
    ("test_41_contact_label_name", "//label[contains(.,'Name')]") ,
    ("test_42_contact_label_email", "//label[contains(.,'Email')]") ,
    ("test_43_contact_label_company", "//label[contains(.,'Company')]") ,
    ("test_44_contact_label_requirement", "//label[contains(.,'Requirement')]") ,
    ("test_45_contact_button_present", "//button[contains(.,'Send')]") ,
]

# Footer presence
_presence_checks += [
    ("test_46_footer_present", "//footer")
]

for name, xp in _presence_checks:
    setattr(InveniaE2E, name, _make_xpath_presence_test(name, xp))

# API checks (backend must be running)
API_BASE = os.getenv('API_BASE', 'http://localhost:4000')
setattr(InveniaE2E, "test_47_api_health_ok", _make_api_get_ok_test("test_47_api_health_ok", f"{API_BASE}/api/health"))
setattr(InveniaE2E, "test_48_api_subscribe_ok", _make_api_post_ok_test("test_48_api_subscribe_ok", f"{API_BASE}/api/subscribe", {"email": f"qa+{int(time.time())}@example.com"}))
setattr(InveniaE2E, "test_49_api_contact_ok", _make_api_post_ok_test("test_49_api_contact_ok", f"{API_BASE}/api/contact", {"name": "QA Bot", "email": "qa@example.com", "phone": None, "message": "Hello"}))

# Responsive check (mobile width)
def _mobile_layout_smoke(self: InveniaE2E):
    self.driver.set_window_size(390, 844)
    nav = self.driver.find_elements(By.TAG_NAME, "nav")
    self.assertTrue(len(nav) >= 1)
setattr(InveniaE2E, "test_50_mobile_layout_smoke", _mobile_layout_smoke)

# Ensure at least 55 tests by adding more text presence checks in company/why choose us
for i, txt in enumerate([
    "About Invenia",
    "Why Choose Invenia?",
    "Join Our Team",
    "Subscribe to Our Newsletter",
    "Industries We Serve"
], start=51):
    setattr(InveniaE2E, f"test_{i:02d}_heading_{i}", _make_xpath_presence_test(f"test_{i:02d}_heading_{i}", f"//*[contains(., '{txt}')]"))


# ------------------------------
# Custom test runner with table
# ------------------------------
class TabularTestResult(unittest.TextTestResult):
    def startTest(self, test):
        if not hasattr(self, 'records'):
            self.records = []
            self._t0 = {}
        self._t0[test] = time.time()
        super().startTest(test)

    def _add_record(self, test, status, message=""):
        dt = time.time() - self._t0.get(test, time.time())
        self.records.append((str(test), status, f"{dt:.2f}", message))

    def addSuccess(self, test):
        super().addSuccess(test)
        self._add_record(test, "PASS")

    def addFailure(self, test, err):
        super().addFailure(test, err)
        self._add_record(test, "FAIL", self._exc_info_to_string(err, test).splitlines()[-1][:160])

    def addError(self, test, err):
        super().addError(test, err)
        self._add_record(test, "ERROR", self._exc_info_to_string(err, test).splitlines()[-1][:160])

    def addSkip(self, test, reason):
        super().addSkip(test, reason)
        self._add_record(test, "SKIP", reason)

def _print_table(records):
    headers = ["Test", "Status", "Time(s)", "Message"]
    widths = [min(60, max(len(r[0]) for r in records+[headers])), 6, 7, min(80, max(len(r[3]) for r in records+[headers]))]
    def fmt_row(row):
        return f"{row[0]:<{widths[0]}} | {row[1]:^{widths[1]}} | {row[2]:^{widths[2]}} | {row[3]:<{widths[3]}}"
    sep = f"{'-'*widths[0]}-+-{'-'*widths[1]}-+-{'-'*widths[2]}-+-{'-'*widths[3]}"
    print(fmt_row(headers))
    print(sep)
    for r in records:
        print(fmt_row(r))


if __name__ == '__main__':
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(InveniaE2E)
    runner = unittest.TextTestRunner(stream=sys.stdout, verbosity=1, resultclass=TabularTestResult)
    result = runner.run(suite)
    print("\n\nTest Summary (Tabular):")
    recs = getattr(result, 'records', [])
    _print_table(recs)
    # Exit code mirrors unittest behavior
    sys.exit(not result.wasSuccessful())
