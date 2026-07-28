'use client'
import { useState } from 'react'
import {
  Building2,
  GraduationCap,
  MapPinned,
  ShoppingBag,
  BookOpen,
} from 'lucide-react'

const F_JOST = 'var(--font-jost), Montserrat, sans-serif'
const F_SANS = 'var(--font-sans), Open Sans, sans-serif'

const locationCategories = [
  {
    category: 'CONNECTIVITY',
    icon: MapPinned,
    items: [
      { name: 'MTC Bus Stop', dist: 'Walkable' },
      { name: 'Metro Phase I', dist: '1 Km' },
    ],
  },
  {
    category: 'SCHOOLS',
    icon: BookOpen,
    items: [
      { name: 'PSBB School within Township', dist: 'On Campus' },
      { name: "St. John's Public School", dist: '4 Km' },
      { name: 'Vels Vidyashram', dist: '4 Km' },
      { name: 'Mount Litera Zee School', dist: '5 Km' },
      { name: 'The School - KFI', dist: '5 Km' },
      { name: 'KC High International School', dist: '5 Km' },
      { name: 'Velammal New Gen', dist: '5 Km' },
      { name: 'Gateway International School', dist: '6 Km' },
      { name: 'Chettinad Sarvalokaa Education International School', dist: '6 Km' },
      { name: 'Amethyst International School', dist: '7 Km' },
      { name: "Shraddha Children's Academy", dist: '7 Km' },
      { name: 'Hindustan International School', dist: '7 Km' },
      { name: 'Vijay Vidhyashram', dist: '7 Km' },
    ],
  },
  {
    category: 'COLLEGES',
    icon: GraduationCap,
    items: [
      { name: 'Dr. Ambedkar Govt Law College', dist: '1 Km' },
      { name: 'Chennai Mathematical Institute (CMI)', dist: '2 Km' },
      { name: 'Mohamed Sathak A.J. College of Engineering', dist: '3 Km' },
      { name: 'Hindustan Institute of Technology & Science', dist: '5 Km' },
      { name: 'Chettinad Medical College', dist: '6 Km' },
      { name: 'Jeppiaar College of Arts & Science', dist: '7 Km' },
      { name: 'Sathyabama University', dist: '8 Km' },
      { name: 'St. Joseph College', dist: '8 Km' },
      { name: 'VIT Chennai', dist: '10 Km' },
      { name: 'SSN College of Engineering', dist: '10 Km' },
    ],
  },
  {
    category: 'ENTERTAINMENT',
    icon: ShoppingBag,
    items: [
      { name: 'Novotel', dist: '3.5 Km' },
      { name: 'INOX Cinemas', dist: '4 Km' },
      { name: 'The Marina Mall', dist: '4 Km' },
      { name: 'OMR Food Street', dist: '5 Km' },
      { name: 'AGS Cinemas', dist: '5 Km' },
      { name: 'Vivira Mall', dist: '5 Km' },
      { name: 'Four Points', dist: '8 Km' },
    ],
  },
  {
    category: 'TOP IT HUBS',
    icon: Building2,
    items: [
      { name: 'Airtel Data Center', dist: '1 Km' },
      { name: 'Atos Syntel', dist: '2 Km' },
      { name: 'Hexaware Technologies', dist: '2 Km' },
      { name: 'Capgemini', dist: '2 Km' },
      { name: 'TCS', dist: '2 Km' },
      { name: 'Cognizant Technology Solutions', dist: '2 Km' },
      { name: 'AdaniConneX Data Center', dist: '3 Km' },
      { name: 'Aspire Systems', dist: '3 Km' },
      { name: 'Sify', dist: '3 Km' },
      { name: 'Intellect', dist: '3 Km' },
      { name: 'FSS', dist: '3 Km' },
      { name: 'Pacifica Tech Park', dist: '4 Km' },
      { name: 'Valeo', dist: '4 Km' },
      { name: 'FLSmidth', dist: '4 Km' },
      { name: 'ETA Technopark', dist: '5 Km' },
      { name: 'HCL', dist: '6 Km' },
      { name: 'Infosys', dist: '9 Km' },
    ],
  },
]

const Location = () => {
  const [openIdx, setOpenIdx] = useState(0)

  return (
    <section id="location" style={{
      padding: '72px 0',
      backgroundImage: "url('/images/highlights/highlight.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">

        {/* Section Header */}
        <div style={{ marginBottom: '50px', textAlign: 'center' }} data-aos="fade-down" data-aos-duration="1000">
           <h2
             className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold leading-tight uppercase tracking-wider text-[#d3be8a]"
             style={{ fontFamily: "var(--font-jost), Montserrat, sans-serif", marginBottom: '12px' }}
           >
             LOCATION ADVANTAGES
           </h2>
           {/* Decorative Line */}
           <div className="flex items-center justify-center mt-3 mb-2">
             <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
             <div className="w-2 h-2 rounded-full bg-[#7d9b93] mx-3"></div>
             <div className="w-16 h-[1px] bg-[#7d9b93]"></div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* LEFT — Accordion */}
          <div className="w-full lg:w-[45%] lg:order-2" data-aos="fade-left" data-aos-duration="1000">
            <div style={{
              padding: '24px',
              borderRadius: '16px',
              background: '#f4ebe4',
              boxShadow: '0 12px 32px rgba(0, 2, 66, 0.12)',
            }}>
              {locationCategories.map((cat, ci) => {
                const CategoryIcon = cat.icon
                const isOpen = openIdx === ci

                return (
                  <div key={ci} style={{
                    marginBottom: ci === locationCategories.length - 1 ? 0 : '14px',
                  }}>
                    <button
                      type="button"
                      onClick={() => setOpenIdx(isOpen ? -1 : ci)}
                      aria-expanded={isOpen}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        padding: '11px 12px',
                        border: '1px solid #d5bd7e',
                        borderRadius: isOpen ? '6px 6px 0 0' : '6px',
                        background: '#d9c28a',
                        color: '#000242',
                        cursor: 'pointer',
                        outline: 'none',
                      }}
                    >
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '13px',
                        minWidth: 0,
                      }}>
                        <CategoryIcon size={25} strokeWidth={1.5} />
                        <span style={{
                          fontFamily: F_JOST,
                          fontSize: '18px',
                          fontWeight: '500',
                          letterSpacing: '0.04em',
                          textTransform: 'capitalize',
                          textAlign: 'left',
                        }}>
                          {cat.category.toLowerCase()}
                        </span>
                      </span>

                      <span style={{
                        fontFamily: F_JOST,
                        fontSize: '23px',
                        fontWeight: '600',
                        lineHeight: 1,
                        flexShrink: 0,
                      }}>
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>

                    <div style={{
                      overflow: 'hidden',
                      maxHeight: isOpen ? `${cat.items.length * 42 + 16}px` : '0',
                      borderLeft: isOpen ? '1px solid #d5bd7e' : '1px solid transparent',
                      borderRight: isOpen ? '1px solid #d5bd7e' : '1px solid transparent',
                      borderBottom: isOpen ? '1px solid #d5bd7e' : '1px solid transparent',
                      borderRadius: '0 0 6px 6px',
                      background: '#f8f0e9',
                      transition: 'max-height 0.32s ease, border-color 0.2s ease',
                    }}>
                      <div style={{ padding: '7px 10px 9px' }}>
                        {cat.items.map((item, i) => (
                          <div key={i} style={{
                            display: 'grid',
                            gridTemplateColumns: 'minmax(0, 1fr) auto',
                            alignItems: 'center',
                            gap: '18px',
                            minHeight: '31px',
                            color: '#000242',
                            fontFamily: F_SANS,
                            fontSize: '13px',
                          }}>
                            <span>{item.name}</span>
                            <span style={{
                              minWidth: '62px',
                              textAlign: 'left',
                              fontSize: '12px',
                              letterSpacing: '0.04em',
                              whiteSpace: 'nowrap',
                            }}>
                              {item.dist}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* RIGHT — Map */}
          <div className="w-full lg:flex-1 lg:order-1" data-aos="fade-right" data-aos-duration="1000" style={{ minHeight: '420px' }}>
            <div style={{
              overflow: 'hidden',
              border: '1px solid #D5C2A8',
              height: '100%', minHeight: '420px',
              position: 'relative',
              background: '#EAE5DC'
            }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.2776245672117!2d80.20615800000002!3d12.8253282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525a1463efdf73%3A0xa7a8f060e3cf1a6c!2sEden%20Park!5e0!3m2!1sen!2sin!4v1785139902158!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '420px', display: 'block', pointerEvents: 'none' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <a 
                href="https://www.google.com/maps/search/Pragnya+Eden+Park+Siruseri+Chennai/"
                target="_blank" 
                rel="noopener noreferrer"
                style={{ position: 'absolute', inset: 0, zIndex: 5, cursor: 'pointer' }}
                title="Open in Google Maps"
              />
              <div style={{
                position: 'absolute', bottom: '16px', left: '16px', zIndex: 10,
                background: 'var(--color-gold)', opacity: 0.9, backdropFilter: 'blur(6px)',
                borderRadius: '8px', padding: '6px 14px',
                display: 'flex', alignItems: 'center', gap: '6px',
                pointerEvents: 'none'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span style={{
                  color: '#fff', fontSize: '11px', fontFamily: F_JOST,
                  fontWeight: '700', letterSpacing: '0.04em'
                }}>
                  Siruseri, OMR Chennai
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Location
