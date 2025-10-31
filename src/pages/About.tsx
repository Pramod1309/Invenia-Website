import  React from 'react';
import { Users, Award, Globe, Target, Eye, Heart } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="gradient-bg text-white section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">About Invenia Consultancy</h1>
              <p className="text-xl mb-8">
                Leading SAP consultancy firm dedicated to transforming businesses through innovative technology solutions and expert guidance.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-1">15+</div>
                  <div className="text-green-200">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">500+</div>
                  <div className="text-green-200">Projects Delivered</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1758630737403-1bda34e3f98e?ixlib=rb-4.1.0&fit=crop&w=800&h=600" 
                alt="Modern office environment"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <Target className="h-12 w-12 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-gray-600">
                To empower businesses worldwide with cutting-edge SAP solutions that drive digital transformation and sustainable growth.
              </p>
            </div>
            <div className="text-center">
              <Eye className="h-12 w-12 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-gray-600">
                To be the global leader in SAP consulting, recognized for innovation, excellence, and transformational business outcomes.
              </p>
            </div>
            <div className="text-center">
              <Heart className="h-12 w-12 text-green-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Values</h3>
              <p className="text-gray-600">
                Excellence, integrity, innovation, and client success drive everything we do, ensuring lasting partnerships and results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600">Meet the experts driving our vision forward</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Chief Executive Officer',
                experience: '20+ years in SAP consulting',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.1.0&fit=crop&w=400&h=400'
              },
              {
                name: 'Michael Chen',
                role: 'Chief Technology Officer',
                experience: '15+ years in enterprise solutions',
                image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.1.0&fit=crop&w=400&h=400'
              },
              {
                name: 'Emily Rodriguez',
                role: 'VP of Consulting',
                experience: '18+ years in business transformation',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.1.0&fit=crop&w=400&h=400'
              }
            ].map((leader, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center">
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold mb-2">{leader.name}</h3>
                <div className="text-green-600 font-medium mb-2">{leader.role}</div>
                <p className="text-gray-600 text-sm">{leader.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Partnerships */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Partnerships</h2>
            <p className="text-xl text-gray-600">Recognized expertise and trusted partnerships</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">SAP Gold Partner</h3>
              <p className="text-gray-600 text-sm">Highest level SAP partnership</p>
            </div>
            <div className="text-center p-6">
              <Globe className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Global Presence</h3>
              <p className="text-gray-600 text-sm">Operations across 15+ countries</p>
            </div>
            <div className="text-center p-6">
              <Users className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Certified Experts</h3>
              <p className="text-gray-600 text-sm">200+ SAP certified consultants</p>
            </div>
            <div className="text-center p-6">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Industry Awards</h3>
              <p className="text-gray-600 text-sm">Multiple consulting excellence awards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="section-padding bg-gray-900 text-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-gray-300">Numbers that reflect our commitment to excellence</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-gray-300">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">98%</div>
              <div className="text-gray-300">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">15+</div>
              <div className="text-gray-300">Industries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">250+</div>
              <div className="text-gray-300">Team Members</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
 