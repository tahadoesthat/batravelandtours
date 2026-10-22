export interface VisaDocument {
  id: string;
  itemNumber: string;
  title: string;
  verbatimText: string;
  badge: string;
  consularClarification: string;
  tags: string[];
  weight: number;
  category: 'core' | 'professional' | 'ties';
  profile?: 'A' | 'B' | 'ALL';
}

export interface VisaCountryData {
  slug: string;
  name: string;
  flag: string;
  countryCode: string;
  visaType: string;
  advisoryCode: string;
  headline: string;
  subheadline: string;
  
  // Pricing and timeline metrics
  applicationFee: string;
  feeSubtext: string;
  submissionStandard: string;
  submissionStandardSubtext: string;
  processingWindow: string;
  processingWindowSubtext: string;
  
  // Custom callout notes from requirements
  feeNotes: string[];
  appointmentNotice?: string;
  
  // Package inclusions
  packageInclusions: string[];
  
  // Insights
  insights: {
    icon: string;
    title: string;
    description: string;
  }[];

  // FAQs
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const COMMON_DOCUMENTS: VisaDocument[] = [
  {
    id: 'passports',
    itemNumber: '01',
    title: 'Current & Previous Passports',
    verbatimText: 'Current Passport copy + all previous passports, first & second page copies — A4 size',
    badge: 'Original Scans',
    consularClarification: 'High-resolution color scans of valid passport + all expired passports (bio pages, signature page, and all pages containing stamped entry/exit marks or previously issued travel visas to substantiate travel history). Valid for at least 6 months beyond travel dates with 2+ blank visa pages.',
    tags: ['A4 Full Page Scans', 'Minimum 6 Months Validity', '2+ Blank Pages Remaining'],
    weight: 15,
    category: 'core',
    profile: 'ALL',
  },
  {
    id: 'cnic',
    itemNumber: '02',
    title: 'CNIC / National Identity Card',
    verbatimText: 'CNIC / ID Card copy — Front & Back',
    badge: 'Identity Card',
    consularClarification: 'High-resolution color scan of both sides on a single page. If your National ID card is in Urdu, an official NADRA Smart National Identity Card or certified English translation stamp must accompany the dossier.',
    tags: ['Color Scan', 'Single PDF Sheet', 'Active Expiry Date'],
    weight: 10,
    category: 'core',
    profile: 'ALL',
  },
  {
    id: 'photos',
    itemNumber: '03',
    title: 'Photographic Biometrics',
    verbatimText: '04 Passport-size Pictures — White Background, 35 × 45 mm',
    badge: 'Consular Standard',
    consularClarification: 'Matte or semi-gloss finish, strictly neutral facial expression with mouth closed, no teeth visible. Head size between 31 mm and 36 mm from chin to crown. Taken within the last 6 months against an untextured pure white background.',
    tags: ['35 × 45 mm', 'Pure White Background', 'Taken < 6 Months', 'No Glare / Shadows'],
    weight: 10,
    category: 'core',
    profile: 'ALL',
  },
  {
    id: 'bank-statement',
    itemNumber: '04',
    title: 'Certified Bank Statement & Maintenance Certificate',
    verbatimText: 'Bank Statement — Last 06 months + Fresh Bank Maintenance Certificate with Bank Stamp',
    badge: 'Financial Solvency',
    consularClarification: 'Closing balance must be fully commensurate with your declared itinerary length and living expenses. The statement must bear fresh official bank branch stamps and signatures on every single page, paired with a formal Bank Account Maintenance Certificate stating account opening date and currency denomination.',
    tags: ['Consecutive 6 Months', 'Branch Stamp on All Pages', 'Maintenance Letter Attached'],
    weight: 25,
    category: 'core',
    profile: 'ALL',
  },
  {
    id: 'ntn-tax',
    itemNumber: '05',
    title: 'NTN Certificate & Tax Returns',
    verbatimText: 'NTN Certificate & Tax Returns — Last 02 years',
    badge: 'Tax Compliance',
    consularClarification: 'Federal Board of Revenue (FBR) acknowledgment receipts and income tax returns for the preceding two fiscal years, validating active taxpayer status alongside the original National Tax Number (NTN) registration certificate.',
    tags: ['2 Fiscal Years', 'FBR Wealth Statement', 'Active Taxpayer List (ATL)'],
    weight: 15,
    category: 'core',
    profile: 'ALL',
  },
  {
    id: 'business-letterhead',
    itemNumber: '06',
    title: 'Business Letterhead / Commercial Records',
    verbatimText: 'Business Letterhead / Business Documents — If self-employed/business owner',
    badge: 'Profile A: Business Owner',
    consularClarification: 'Official company letterhead showing registration details, SECP incorporation deeds, partnership deeds (Form C), Chamber of Commerce membership certificate, and commercial banking instruments.',
    tags: ['Company Letterhead', 'SECP / Form C Deeds', 'Chamber of Commerce Certificate'],
    weight: 10,
    category: 'professional',
    profile: 'A',
  },
  {
    id: 'salary-slips',
    itemNumber: '08',
    title: 'Salary Slips',
    verbatimText: 'Salary Slips — Last 03 months, if employed',
    badge: 'Profile B: Salaried',
    consularClarification: 'Signed and stamped by corporate HR or Finance division. Bank credits in your personal statement must precisely match payslip net pay amounts.',
    tags: ['Last 3 Consecutive Months', 'HR / Finance Stamp', 'Matches Bank Credits'],
    weight: 10,
    category: 'professional',
    profile: 'B',
  },
  {
    id: 'employment-letter',
    itemNumber: '09',
    title: 'Employment Letter / NOC',
    verbatimText: 'Employment Letter — If employed',
    badge: 'Profile B: Salaried',
    consularClarification: 'Official No Objection Certificate (NOC) / Job Confirmation on corporate letterhead confirming exact designation, tenure, approved leave dates & remuneration.',
    tags: ['Corporate Letterhead', 'Approved Leave Dates', 'HR Sign-off & Stamp'],
    weight: 10,
    category: 'professional',
    profile: 'B',
  },
  {
    id: 'property-docs',
    itemNumber: '07',
    title: 'Substantive Home Ties & Capital Assets',
    verbatimText: 'Property Documents — If available',
    badge: 'Recommended Tie',
    consularClarification: 'Ownership title deeds, land registry allotment letters, residential / commercial title files, or certified CA valuation assessments. While optional under base statute, property documentation provides compelling evidentiary proof establishing undeniable economic ties to your home country.',
    tags: ['Allotment Letters', 'Property Valuation Report', 'English Translation If Applicable'],
    weight: 10,
    category: 'ties',
    profile: 'ALL',
  },
];

export const VISAS_DATA: Record<string, VisaCountryData> = {
  canada: {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    countryCode: 'CA',
    visaType: 'Tourist & Visitor Visa (TRV / V-1)',
    advisoryCode: 'IRCC ADVISORY #CA-2024-V3',
    headline: 'Canada — Tourist & Visitor Visa Document Requirements',
    subheadline: 'Comprehensive submission checklist, certified scan standards, and consular processing advisory for Canadian Temporary Resident Visa (TRV / V-1) applications.',
    applicationFee: 'PKR 50,000',
    feeSubtext: '/ person (Full Concierge Dossier)',
    submissionStandard: 'All High-Res Scan Format',
    submissionStandardSubtext: 'PDF (300 DPI / True A4 Dimensions)',
    processingWindow: '4 – 8 Weeks',
    processingWindowSubtext: 'average processing time',
    feeNotes: [
      'Application charges: PKR 50,000 per person',
      'Covers complete digital dossier preparation, IMM form filings & pre-submission audit',
      'Biometrics at VFS Global required (valid for 10 years once completed)',
    ],
    appointmentNotice: 'VFS Global biometrics appointment scheduling included in consultation.',
    packageInclusions: [
      'Complete IRCC Portal Application Filing (IMM 5257 & IMM 5645)',
      'Bespoke Canadian Expedition Itinerary & Day-by-Day Travel Plan',
      'Tailored Purpose of Travel & Cover Letter Drafting',
      'Financial Affidavit & Solvency Ratio Pre-Audit',
      'VFS Global Biometrics Appointment Booking Coordination',
    ],
    insights: [
      {
        icon: 'Fingerprint',
        title: 'Biometrics Validity Protocol',
        description: 'Canadian biometrics remain valid for a full 10-year term. If you have completed biometrics at VFS Global within the last decade, you are exempt from re-enrollment fees and appointments.',
      },
      {
        icon: 'Wallet',
        title: 'Unexplained Deposits Advisory',
        description: 'Sudden lump-sum deposits in your 6-month bank statement trigger immediate scrutiny under IRCC audit systems. All credits must reflect documented income sources, dividend payouts, or asset liquidations.',
      },
      {
        icon: 'Users',
        title: 'Family & Group Dossiers',
        description: 'When applying as a family unit, a certified FRC (Family Registration Certificate) issued by NADRA is mandatory. The primary sponsor\'s bank statement must demonstrate surplus liquidity for each dependent.',
      },
    ],
    faqs: [
      {
        question: 'Are physical documents sent to the Canadian Embassy?',
        answer: 'No. All Canadian visitor visa applications are submitted digitally via the IRCC portal. However, clean flatbed scans at 300 DPI in PDF format are strictly required to pass automatic OCR and consular audits.',
      },
      {
        question: 'What closing bank balance is expected for Canada?',
        answer: 'There is no official fixed statutory number, but a healthy closing balance of PKR 1.8M – 3.5M+ per applicant alongside steady turnover and clear tax records is strongly recommended for standard 2–3 week itineraries.',
      },
      {
        question: 'How long is the Canadian visitor visa valid?',
        answer: 'Canadian TRVs are typically granted for multiple entries up to the expiration date of your passport (often up to 10 years minus one month).',
      },
      {
        question: 'Do I need hotel bookings and flight tickets before applying?',
        answer: 'Confirmed non-refundable flight tickets are NOT required by IRCC prior to visa approval. We supply verifiable travel reservations and day-by-day itineraries compliant with consular guidelines.',
      },
    ],
  },

  schengen: {
    slug: 'schengen',
    name: 'Europe — Schengen',
    flag: '🇪🇺',
    countryCode: 'EU',
    visaType: 'Uniform Schengen Visa (Type C Short Stay)',
    advisoryCode: 'SCHENGEN CONSULAR ADVISORY #EU-2024-C',
    headline: 'Europe — Schengen Visa Document Requirements',
    subheadline: 'Mandatory documentation dossier, biometric booking guidelines, and embassy submission standards for 29 European Schengen member states.',
    applicationFee: 'PKR 25,000',
    feeSubtext: '/ person (Without Appointment)',
    submissionStandard: 'Scan Dossier + Physical File',
    submissionStandardSubtext: 'Color scans + Certified paper portfolio',
    processingWindow: '3 – 5 Weeks',
    processingWindowSubtext: 'post-appointment decision average',
    feeNotes: [
      'Application charges: PKR 25,000 per person without appointment',
      'Appointment charges is subject to embassy and availability',
      'Comprehensive dossier compilation, cover letter, verified flight/hotel reservations & travel insurance assistance included',
    ],
    appointmentNotice: '* Appointment charges is subject to embassy and availability *',
    packageInclusions: [
      'Embassy Application Form Preparation (France, Germany, Italy, Spain, Switzerland, etc.)',
      'Bespoke Multi-Country European Travel Itinerary & Rail Schedule',
      'Schengen-Compliant EUR 30,000 Travel Health Insurance Coordination',
      'Verified Flight Reservation & Confirmed Hotel Vouchers',
      'Formal Cover Letter & Evidentiary Proof of Home Ties Drafting',
    ],
    insights: [
      {
        icon: 'Globe2',
        title: 'Rule of Main Destination',
        description: 'You must apply at the embassy of the Schengen state that constitutes your main destination (longest duration of stay). If equal days, apply at the country of first entry.',
      },
      {
        icon: 'ShieldCheck',
        title: 'EUR 30,000 Insurance Mandate',
        description: 'Schengen travel medical insurance must cover emergency repatriation and hospital treatment with zero deductible across all 29 member nations for your full itinerary.',
      },
      {
        icon: 'Calendar',
        title: 'Appointment Availability Windows',
        description: 'Schengen embassy appointment slots at VFS, BLS, and TLS release periodically. We monitor and reserve your biometrics slot strictly as embassy quotas open.',
      },
    ],
    faqs: [
      {
        question: 'What are the application charges and appointment policy?',
        answer: 'Our professional file preparation and dossier curation charge is PKR 25,000 per person without appointment. Appointment booking charges depend entirely on embassy fee schedules, center availability (VFS/BLS/TLS), and seasonal slot constraints.',
      },
      {
        question: 'Can I travel to other European countries on a Schengen visa?',
        answer: 'Yes. A Uniform Schengen Visa (Type C) permits unhindered travel across all 29 Schengen member countries, including France, Italy, Germany, Switzerland, Spain, Austria, and Greece.',
      },
      {
        question: 'What bank balance is recommended for Schengen?',
        answer: 'European embassies generally calculate €100–€120 per day of stay plus flight and accommodation buffer. A solid, transparent closing balance of PKR 1.5M – 2.5M+ with active monthly transactions is recommended.',
      },
      {
        question: 'How early can I lodge my Schengen application?',
        answer: 'Under the revised Schengen Visa Code, you can submit your application up to 6 months before your intended travel date.',
      },
    ],
  },

  usa: {
    slug: 'usa',
    name: 'USA',
    flag: '🇺🇸',
    countryCode: 'US',
    visaType: 'B1/B2 Visitor & Business Visa',
    advisoryCode: 'US EMBASSY ADVISORY #US-DS160-2024',
    headline: 'USA — Visa Document Requirements',
    subheadline: 'DS-160 application submission protocol, evidentiary financial dossier, and consular interview preparation for United States B1/B2 Visitor Visas.',
    applicationFee: 'PKR 25,000',
    feeSubtext: '/ person (Professional Filing)',
    submissionStandard: 'DS-160 Digital + Interview File',
    submissionStandardSubtext: 'CEAC confirmation & curated portfolio',
    processingWindow: 'Based on Interview Dates',
    processingWindowSubtext: 'immediate decision at interview',
    feeNotes: [
      'Application charges: PKR 25,000 per person',
      '* Note: Appointment charges is considered separately *',
      'Includes DS-160 precision drafting, MRV fee slip generation & personalized consular interview mock prep',
    ],
    appointmentNotice: '* Note Appointment Charges is Considered in separately *',
    packageInclusions: [
      'Comprehensive DS-160 Electronic Form Lodgment with Zero Discrepancies',
      'US Travel Docs Profile Setup & MRV Fee Generation',
      'Tailored US Coast-to-Coast / City Itinerary Blueprint',
      'Section 214(b) Presumption of Immigrant Intent Overcoming Strategy',
      'Personalized Consular Officer Interview Simulation & Dossier Binder Organization',
    ],
    insights: [
      {
        icon: 'FileText',
        title: 'Section 214(b) Legal Burden',
        description: 'US immigration law presumes every visitor applicant intends to immigrate until they prove strong, irreversible ties (employment, business equity, real estate, and family dependents) to their home country.',
      },
      {
        icon: 'UserCheck',
        title: 'DS-160 Verbatim Accuracy',
        description: 'Every statement during your in-person embassy interview is checked live against your submitted DS-160 form. Our team ensures complete factual alignment across all answers.',
      },
      {
        icon: 'Calendar',
        title: 'Interview Scheduling Realities',
        description: 'Embassy wait times fluctuate. We facilitate expedited date monitoring and appointment rescheduling whenever consular interview slots open.',
      },
    ],
    faqs: [
      {
        question: 'How are appointment fees handled for the USA?',
        answer: 'Our professional filing fee is PKR 25,000 per person. The official US Embassy MRV fee ($185 USD equivalent in PKR) and any third-party expedited appointment monitoring are considered separately as per embassy terms.',
      },
      {
        question: 'Does the consular officer look at my property and bank papers?',
        answer: 'Consular officers make their decision in 2–3 minutes primarily based on the interview and your DS-160. However, carrying an organized portfolio containing your stamped 6-month bank statement, tax returns, and property papers is crucial if questioned.',
      },
      {
        question: 'How long is the US visitor visa granted for?',
        answer: 'For Pakistani citizens, US B1/B2 visas are commonly issued with 5-year multiple-entry validity, allowing stays up to 6 months per entry as stamped by CBP at port of entry.',
      },
    ],
  },

  turkey: {
    slug: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    countryCode: 'TR',
    visaType: 'Sticker Tourist Visa / Anatolian Expedition',
    advisoryCode: 'TURKISH CONSULAR ADVISORY #TR-2024-V2',
    headline: 'Turkey — Visa Document Requirements',
    subheadline: 'Sticker visa checklist, Gerry\'s Anatolia submission preparation, and itinerary curation for leisure travelers and cultural explorers.',
    applicationFee: 'PKR 15,000',
    feeSubtext: '/ person (Full Application Filing)',
    submissionStandard: 'Scan Form + Physical Submission',
    submissionStandardSubtext: 'Color scans + Anatolia drop-off dossier',
    processingWindow: '2 – 4 Weeks',
    processingWindowSubtext: 'consular review timeline',
    feeNotes: [
      'Application charges: PKR 15,000 per person',
      'Full Anatolia Visa Center (Gerry\'s) document compliance preparation',
      'Embassy visa fee and Gerry\'s center service charges payable directly at submission counter',
    ],
    appointmentNotice: 'Walk-in or pre-booked submission at Gerry\'s Anatolia Visa Center.',
    packageInclusions: [
      'Official Turkey Consular Form Processing',
      'Custom Istanbul, Cappadocia & Turquoise Coast Day-by-Day Itinerary',
      'Verified Flight Reservation & Hotel Booking Vouchers',
      'Detailed Cover Letter & Proof of Financial Solvency Compilation',
      'Gerry\'s Anatolia Submission File Organization & Pre-Audit',
    ],
    insights: [
      {
        icon: 'MapPin',
        title: 'Gerry\'s Anatolia Center Protocol',
        description: 'Turkey sticker visa applications are received through Gerry\'s Anatolia visa centers across Pakistan. Every document must follow the specific order dictated by the Turkish Consulate.',
      },
      {
        icon: 'CheckCircle',
        title: 'Electronic Visa (e-Visa) Alternative',
        description: 'If you already hold a valid Schengen, US, UK, or Irish visa/residence permit, you may be eligible for an instant Turkey e-Visa online. Contact us to verify eligibility.',
      },
      {
        icon: 'Building',
        title: 'Chamber & Business Endorsement',
        description: 'For business owners, inclusion of your active Chamber of Commerce membership card and SECP certificates substantially improves approval velocity.',
      },
    ],
    faqs: [
      {
        question: 'What are the application charges for Turkey?',
        answer: 'Our file preparation, cover letter drafting, verified hotel/flight reservations, and file audit charge is PKR 15,000 per person. Embassy visa fees are paid directly at Gerry\'s counter.',
      },
      {
        question: 'Can I apply for an e-Visa instead of a sticker visa?',
        answer: 'Ordinary passport holders from Pakistan require a valid sticker visa unless they hold a valid visa or residence permit from the USA, UK, Schengen, or Ireland.',
      },
      {
        question: 'What bank balance is needed for Turkey?',
        answer: 'A transparent bank statement for the last 6 months with a closing balance of PKR 1M – 1.8M+ and regular active turnover is recommended.',
      },
    ],
  },

  thailand: {
    slug: 'thailand',
    name: 'Thailand',
    flag: '🇹🇭',
    countryCode: 'TH',
    visaType: 'Single Entry Tourist Visa (TR) / E-Visa',
    advisoryCode: 'ROYAL THAI CONSULAR ADVISORY #TH-2024-TR',
    headline: 'Thailand — Visa Document Requirements',
    subheadline: 'Document scanning standards, certified financial proofs, and complete consular processing for tropical expeditions and cultural retreats.',
    applicationFee: 'PKR 18,500',
    feeSubtext: '/ person (Including Visa Fee)',
    submissionStandard: 'All High-Res Scan Form',
    submissionStandardSubtext: 'Color scans (PDF & JPEG formats)',
    processingWindow: '10 – 14 Working Days',
    processingWindowSubtext: 'embassy processing window',
    feeNotes: [
      'All documents required and scan form',
      'Per person visa fee charges: PKR 18,500 per person (covers official visa fee + application filing)',
      'No physical courier required — clean digital transmission and consular submission',
    ],
    appointmentNotice: 'All document required and scan firm per person visa fee charges 18,500 per person',
    packageInclusions: [
      'Complete Royal Thai Embassy Application Filing',
      'Official Embassy Visa Fee Included in Pricing',
      'Verified Return Flight Itinerary & Confirmed Bangkok/Phuket Hotel Vouchers',
      'Complete Scan Quality Enhancement & Margins Pre-Audit',
      'Passport Tracking & Direct Status Notifications',
    ],
    insights: [
      {
        icon: 'FileCheck',
        title: 'All Scans Standard',
        description: 'Thailand requires all supporting documents in clean digital scan form. High-resolution flatbed scans with visible margins prevent processing delays.',
      },
      {
        icon: 'Coins',
        title: 'Minimum Financial Threshold',
        description: 'Royal Thai Consulate requires proof of adequate finances: minimum $700 USD equivalent (approx. PKR 500,000 – 800,000+) for solo travelers, and $1,400 USD for families.',
      },
      {
        icon: 'Plane',
        title: 'Confirmed Onward Travel',
        description: 'Verifiable round-trip flight reservations departing from and returning to your home country within 60 days are strictly audited.',
      },
    ],
    faqs: [
      {
        question: 'Does the PKR 18,500 fee include the official visa fee?',
        answer: 'Yes! For Thailand, our fee of PKR 18,500 per person includes the official embassy visa fee charges along with complete scan preparation, verified bookings, and application lodging.',
      },
      {
        question: 'How long can I stay in Thailand on a Tourist Visa?',
        answer: 'The standard Single Entry Tourist Visa (TR) permits a stay of up to 60 days in the Kingdom, which can be extended for an additional 30 days at Thai Immigration in Bangkok or Chiang Mai.',
      },
      {
        question: 'Are physical documents required?',
        answer: 'All supporting documents are compiled in scan form. In select jurisdictions, the physical passport is submitted for final visa stamping.',
      },
    ],
  },

  'south-africa': {
    slug: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    countryCode: 'ZA',
    visaType: 'Visitor\'s Visa (Section 11(1) Holiday / Safari)',
    advisoryCode: 'DHA SOUTH AFRICA ADVISORY #ZA-2024-V11',
    headline: 'South Africa — Visa Document Requirements',
    subheadline: 'Comprehensive documentation, DHA compliance benchmarks, and wildlife expedition travel dossier preparation for South Africa.',
    applicationFee: 'PKR 25,000',
    feeSubtext: '/ person (Without Appointment)',
    submissionStandard: 'Scan Dossier + VFS Submission',
    submissionStandardSubtext: 'Color scans + certified physical file',
    processingWindow: '4 – 6 Weeks',
    processingWindowSubtext: 'DHA consular processing time',
    feeNotes: [
      'Application charges: PKR 25,000 per person without appointment',
      'Covers detailed Kruger & Cape Town safari itineraries, DHA application form & financial dossier',
      'VFS appointment and center logistics coordinated based on center availability',
    ],
    appointmentNotice: '* Application charges per person 25,000 without appointment *',
    packageInclusions: [
      'Department of Home Affairs (DHA-84) Form Preparation',
      'Detailed Safari, Winelands & Garden Route Itinerary Blueprint',
      'Verified Flight Reservations & Certified Accommodation Proofs',
      'Cover Letter Highlighting Purpose of Holiday & Guaranteed Return',
      'VFS South Africa Submission Portfolio Assembly',
    ],
    insights: [
      {
        icon: 'Compass',
        title: 'Day-to-Day Safari Itinerary',
        description: 'South African consular officers scrutinize your route. A clear, cohesive day-to-day itinerary outlining transport, game reserves, and confirmed lodges is mandatory.',
      },
      {
        icon: 'Shield',
        title: 'Polio / Yellow Fever Vaccination',
        description: 'Travelers from or transiting through designated regions must hold a certified International Vaccination Certificate (Yellow Card).',
      },
      {
        icon: 'FileSpreadsheet',
        title: 'Bank Statement Rigor',
        description: 'Statements must show consistent monthly salary/business inflows. Three to six months of certified bank records with high closing liquidity are expected.',
      },
    ],
    faqs: [
      {
        question: 'What are the charges for South Africa visa assistance?',
        answer: 'Our professional file compilation and concierge dossier charge is PKR 25,000 per person without appointment. VFS appointment charges and official DHA visa fees are handled based on center availability.',
      },
      {
        question: 'How long before travel should I apply for South Africa?',
        answer: 'We recommend submitting at least 6 to 8 weeks before your planned departure to allow sufficient time for DHA consular review and passport dispatch.',
      },
      {
        question: 'What duration is usually granted for a South Africa tourist visa?',
        answer: 'Visitor visas are typically granted for the exact duration of your declared itinerary, up to a maximum of 90 days single or multiple entry.',
      },
    ],
  },

  japan: {
    slug: 'japan',
    name: 'Japan',
    flag: '🇯🇵',
    countryCode: 'JP',
    visaType: 'Temporary Visitor Visa (Short-Term Stay)',
    advisoryCode: 'JAPAN CONSULAR ADVISORY #JP-MOFA-2024',
    headline: 'Japan — Visa Document Requirements',
    subheadline: 'Strict MOFA compliance, Taizai Yoteihyo daily schedules, and financial solvency verification for cultural journeys across Tokyo, Kyoto, and Hokkaido.',
    applicationFee: 'PKR 25,000',
    feeSubtext: '/ person (Without Appointment)',
    submissionStandard: 'MOFA Dossier Standard',
    submissionStandardSubtext: 'Exact Japanese consular file protocol',
    processingWindow: '2 – 3 Weeks',
    processingWindowSubtext: 'from Gerry\'s drop-off date',
    feeNotes: [
      'Application charges: PKR 25,000 per person without appointment',
      'Includes Japanese Schedule of Stay (Taizai Yoteihyo) in official Ministry format',
      'Submission through designated Gerry\'s Visa Drop Box / Embassy authorized agency',
    ],
    appointmentNotice: '* Application charges per person 25,000 without appointment *',
    packageInclusions: [
      'Official MOFA Visa Application Form Filling',
      'Meticulous Schedule of Stay (Taizai Yoteihyo) with Hotel Contacts & Route',
      'Verifiable Flight Reservation & Accommodations Portfolio',
      'Financial Solvency & Tax Alignment Audit',
      'Gerry\'s Japan Visa Drop Box Submission File Readiness Review',
    ],
    insights: [
      {
        icon: 'CalendarDays',
        title: 'Taizai Yoteihyo (Schedule of Stay)',
        description: 'Japan requires an exact daily schedule table detailing where you will be every single day, which train/flight you take, and the specific phone numbers of your hotels.',
      },
      {
        icon: 'Receipt',
        title: 'Tax Compliance Alignment',
        description: 'Consular officers cross-examine your submitted bank inflows with your FBR Tax Returns and Active Taxpayer status. Precision harmony between these documents is vital.',
      },
      {
        icon: 'Sparkles',
        title: 'Zero Tolerance for Inconsistencies',
        description: 'The Japanese Embassy emphasizes total transparency. Never submit unverified bookings or conflicting job credentials.',
      },
    ],
    faqs: [
      {
        question: 'What does the PKR 25,000 fee cover for Japan?',
        answer: 'It covers our comprehensive file preparation, drafting of the mandatory Japanese Schedule of Stay (Taizai Yoteihyo), flight/hotel reservation proofs, and financial pre-audit. Submission is handled via authorized Gerry\'s Japan drop box.',
      },
      {
        question: 'Do I need a guarantor or invitee in Japan?',
        answer: 'For a self-funded tourist visa, a Japanese guarantor is NOT required if you provide sufficient personal bank statements, tax returns, and travel plans.',
      },
      {
        question: 'How long does Japan visa processing take?',
        answer: 'Once submitted to the Embassy through Gerry\'s, decisions typically take 10 to 15 working days.',
      },
    ],
  },

  australia: {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    countryCode: 'AU',
    visaType: 'Visitor Visa (Subclass 600 - Tourist Stream)',
    advisoryCode: 'HOME AFFAIRS AUSTRALIA #AU-SUBCLASS-600',
    headline: 'Australia — Visa Document Requirements',
    subheadline: 'Complete ImmiAccount digital lodgment, Genuine Temporary Entrant (GTE) evidence, and Australian Home Affairs compliance standards.',
    applicationFee: 'PKR 35,000',
    feeSubtext: '/ person (Without Visa Fee)',
    submissionStandard: 'All Document Required & Scan Form',
    submissionStandardSubtext: '100% Digital Scans (Color, 300 DPI PDF)',
    processingWindow: '3 – 6 Weeks',
    processingWindowSubtext: 'Department of Home Affairs standard',
    feeNotes: [
      'All document required and scan form',
      'Per person application charges: PKR 35,000 without Visa fee',
      'Official Department of Home Affairs visa fee (AUD 190 equivalent) payable online separately',
      'Biometrics collection at VFS Global required upon referral',
    ],
    appointmentNotice: '* All document required and scan form • Per person application charges 35,000 without Visa fee *',
    packageInclusions: [
      'Full ImmiAccount Lodgment (Subclass 600 Tourist Stream)',
      'Rigorous Genuine Temporary Entrant (GTE) Declaration & Narrative Drafting',
      'Detailed Melbourne, Sydney & Great Barrier Reef Itinerary Blueprint',
      'Document Categorization & Multi-Attachment Optimization',
      'VFS Biometrics Referral Letter Handling & Guidance',
    ],
    insights: [
      {
        icon: 'Laptop',
        title: '100% Paperless Digital Filing',
        description: 'All Australian visa applications are lodged online via ImmiAccount. Every scan must be pristine, color, and correctly categorized under Home Affairs evidentiary groups.',
      },
      {
        icon: 'Award',
        title: 'Genuine Temporary Entrant (GTE)',
        description: 'Home Affairs evaluates your personal circumstances in your home country, employment stability, economic assets, and genuine intent to stay temporarily.',
      },
      {
        icon: 'Fingerprint',
        title: 'Biometrics at VFS Global',
        description: 'After online lodging, you will receive a Biometric Requirement Letter within 24 hours. You must book an appointment at VFS Global for digital photo and fingerprint capture.',
      },
    ],
    faqs: [
      {
        question: 'What is included in the PKR 35,000 application charge?',
        answer: 'Our PKR 35,000 fee covers the complete professional preparation, GTE narrative formulation, ImmiAccount filing, scan optimization, and biometric coordination. The official Home Affairs visa fee (AUD 190) is paid directly to the Australian government.',
      },
      {
        question: 'Do I send my physical passport to the Australian High Commission?',
        answer: 'No. Australia issues electronic visas (label-free). You only present your passport physically at VFS Global during your brief biometrics appointment.',
      },
      {
        question: 'How long can I stay in Australia on Subclass 600?',
        answer: 'Visitor visas are commonly granted for 3, 6, or 12 months with single or multiple entries depending on your profile strength and itinerary.',
      },
    ],
  },

  malaysia: {
    slug: 'malaysia',
    name: 'Malaysia',
    flag: '🇲🇾',
    countryCode: 'MY',
    visaType: 'Single Entry e-Visa / Tourist Visa',
    advisoryCode: 'IMMIGRATION MALAYSIA ADVISORY #MY-EV-2024',
    headline: 'Malaysia — Visa Document Requirements',
    subheadline: 'High-speed Malaysian e-Visa application filing with flexible Normal (15-day) and Urgent (5-day) processing speeds for seamless Southeast Asian voyages.',
    applicationFee: 'PKR 20,000 / PKR 35,000',
    feeSubtext: 'Normal: PKR 20,000 | Urgent: PKR 35,000',
    submissionStandard: 'All Documents Required in Scan Form',
    submissionStandardSubtext: 'Digital passport & document upload',
    processingWindow: 'Normal: 15 Days | Urgent: 5 Days',
    processingWindowSubtext: 'guaranteed processing timelines',
    feeNotes: [
      'All documents required in scan form',
      'Normal visa: PKR 20,000 per person (15 working days)',
      'Urgent visa: PKR 35,000 per person (within 5 working days)',
      '100% online issuance — no embassy visit or physical passport submission',
    ],
    appointmentNotice: '• Normal visa 20,000 with 15 working days • Urgent visa 35,000 with in 5 working days',
    packageInclusions: [
      'Official Malaysian eVisa Portal Lodgment',
      'Choice of Standard (15 days) or Express Urgent (5 days) Processing',
      'Confirmed Return Flight Tickets & Kuala Lumpur Hotel Vouchers',
      'Clean Scan Alignment & Passport Bio-Data Page Optimization',
      'Direct Digital e-Visa PDF Dispatch to Your Email & WhatsApp',
    ],
    insights: [
      {
        icon: 'Zap',
        title: 'Urgent vs Normal Speed Options',
        description: 'Choose Normal processing (PKR 20,000 / 15 working days) for advance plans, or Urgent Express (PKR 35,000 / 5 working days) when your departure date is right around the corner.',
      },
      {
        icon: 'ScanLine',
        title: 'All Documents in Scan Form',
        description: 'No physical courier is needed. Clear optical scans of your passport, CNIC, white-background photo, and recent bank statement are all that is required.',
      },
      {
        icon: 'CheckCheck',
        title: 'Malaysia Digital Arrival Card (MDAC)',
        description: 'In addition to your approved eVisa, all international visitors must complete the digital MDAC card online within 3 days prior to landing.',
      },
    ],
    faqs: [
      {
        question: 'What is the price difference between Normal and Urgent Malaysia visas?',
        answer: 'Normal Visa processing is PKR 20,000 per person and takes 15 working days. Urgent Visa processing is PKR 35,000 per person and delivers your approved e-Visa within 5 working days.',
      },
      {
        question: 'Do I have to visit the Malaysian Embassy or submit my passport?',
        answer: 'No. The entire process is handled digitally. Your approved Malaysian e-Visa will be issued as an electronic PDF that you simply print and present upon boarding.',
      },
      {
        question: 'What is the validity of the Malaysian Tourist e-Visa?',
        answer: 'The e-Visa is valid for 3 months from the date of issue and allows a single stay of up to 30 consecutive days in Malaysia.',
      },
    ],
  },
};
