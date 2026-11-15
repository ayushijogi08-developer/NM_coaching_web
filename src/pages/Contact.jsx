import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import ScrollReveal from '../components/common/ScrollReveal';
import { CONTACT_INFO } from '../data/contactConfig';
import { useLanguage } from '../i18n/LanguageContext';

// WhatsApp SVG Icon
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2c-5.508 0-9.984 4.477-9.984 9.984 0 1.761.458 3.479 1.332 5.002L2 22l5.176-1.356a9.92 9.92 0 0 0 4.855 1.258h.004c5.508 0 9.984-4.476 9.984-9.984 0-2.668-1.039-5.175-2.926-7.062A9.923 9.923 0 0 0 12.031 2zm0 18.25c-1.503 0-2.973-.404-4.253-1.169l-.305-.181-3.158.828.843-3.078-.198-.316a8.232 8.232 0 0 1-1.265-4.35c0-4.57 3.718-8.288 8.289-8.288 2.214 0 4.296.863 5.862 2.43 1.566 1.567 2.428 3.649 2.428 5.863 0 4.57-3.718 8.288-8.288 8.288zm4.542-6.205c-.249-.125-1.474-.727-1.703-.81-.228-.083-.395-.125-.561.125-.166.249-.644.81-.79 1-.145.187-.291.208-.54.083-.249-.125-1.053-.388-2.006-1.238-.741-.661-1.242-1.478-1.387-1.728-.146-.249-.016-.384.108-.508.112-.112.249-.291.374-.437.125-.145.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.561-1.352-.769-1.851-.203-.487-.409-.42-.561-.428-.145-.008-.312-.01-.478-.01s-.437.062-.665.312c-.228.249-.873.853-.873 2.08s.894 2.413 1.019 2.58c.125.166 1.758 2.685 4.259 3.765.595.257 1.06.411 1.423.527.599.19 1.144.163 1.575.099.48-.072 1.474-.603 1.682-1.185.208-.582.208-1.081.146-1.185-.063-.104-.229-.166-.478-.291z" />
    </svg>
  );
}

export default function Contact() {
  const { tr } = useLanguage();
  const [isOpenNow, setIsOpenNow] = useState(false);

  useEffect(() => {
    const ist = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
    setIsOpenNow(ist.getHours() >= 11 && ist.getHours() < 20);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-[#F5F0FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Heading */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#B45309] bg-amber-50 border border-amber-200/60 px-3 py-1 rounded-full mb-2">
              {tr("Get In Touch")}
            </span>
            <h2 className="font-heading font-bold text-2xl md:text-3xl text-brand-deep">
              {tr("Visit Our Campus or Reach Out")}
            </h2>
            <p className="text-[#5B4B75] mt-2 text-sm sm:text-base">
              {tr("Our Alsi Plot centre is open 7 days a week from 11:00 AM to 8:00 PM.")}
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1: Address */}
          <ScrollReveal delay={40}>
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-purple flex items-center justify-center mb-3.5 flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-brand-deep mb-1.5">
                  {tr("Academy Address")}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4B75] leading-relaxed">
                  {tr("Manorama Bhavan, Alsi Plot 393, Akola – 444001, Maharashtra.")}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-brand-purple font-semibold">
                {tr("Landmark: Near Khandelwal Bhawan")}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Phone */}
          <ScrollReveal delay={80}>
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-3.5 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-brand-deep mb-1.5">
                  {tr("Call Directly")}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4B75] leading-relaxed">
                  {tr("Reach our counseling desk for batch and admission enquiries.")}
                </p>
                <a 
                  href={CONTACT_INFO.phoneTel} 
                  className="inline-flex items-center mt-2 text-sm font-bold text-[#B45309] hover:underline min-h-[44px]"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-[#5B4B75]">
                {tr("Available 11:00 AM – 8:00 PM")}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: WhatsApp */}
          <ScrollReveal delay={120}>
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3.5 flex-shrink-0">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-brand-deep mb-1.5">
                  {tr("WhatsApp Enquiry")}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4B75] leading-relaxed">
                  {tr("Send a quick message to check seat availability and timings.")}
                </p>
                <a 
                  href={CONTACT_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center mt-2 text-sm font-bold text-emerald-700 hover:underline min-h-[44px]"
                >
                  {tr("Chat on WhatsApp")}
                </a>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-emerald-700 font-medium">
                {tr("Instant response during hours")}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Operating Hours */}
          <ScrollReveal delay={160}>
            <div className="bg-white border border-[#6B3FA0]/10 rounded-2xl p-5 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-brand-purple flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    isOpenNow ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-brand-dark'
                  }`}>
                    {isOpenNow ? tr('Open Now') : tr('Closed Now')}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-deep mb-1.5">
                  {tr("Center Hours")}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B4B75] leading-relaxed">
                  {tr("Monday to Sunday")}<br />
                  <span className="font-semibold text-brand-deep">{tr("11:00 AM – 08:00 PM")}</span>
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-brand-purple font-semibold">
                {tr("Open 7 Days a Week")}
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Embedded Google Map */}
        <div className="rounded-2xl overflow-hidden bg-white border border-[#6B3FA0]/10 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="font-heading font-bold text-lg text-brand-deep">
                {tr("Academy Location")}
              </h3>
              <p className="text-xs text-[#5B4B75]">
                {CONTACT_INFO.address.full}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <a
                href={CONTACT_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex-1 sm:flex-initial"
              >
                <span>{tr("Get Directions")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={CONTACT_INFO.mapLinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary-light flex-1 sm:flex-initial"
              >
                <span>{tr("Open in Maps")}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden bg-gray-100">
            <iframe
              title="Ninamore Knowledge Academy location on Google Maps"
              src={CONTACT_INFO.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
