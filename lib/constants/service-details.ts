import { services as navigationServices } from "@/lib/constants/navigation";

export type ServiceCategorySlug = "business" | "entity" | "tax";

export type ServiceDetail = {
  category: ServiceCategorySlug;
  categoryTitle: string;
  categoryHref: string;
  slug: string;
  title: string;
  href: string;
  heroImage: string;
  summary: string;
  overview: string;
  bestFor: string[];
  inclusions: string[];
  process: string[];
};

const categoryMeta: Record<ServiceCategorySlug, { title: string; href: string; heroImage: string }> = {
  business: { title: "Business Services", href: "/services/business", heroImage: "business.jpg" },
  entity: { title: "New Entity Setup", href: "/services/entity", heroImage: "entity.jpg" },
  tax: { title: "Individual Tax Services", href: "/services/tax", heroImage: "tax.jpg" },
};

const details: Record<string, Omit<ServiceDetail, "categoryTitle" | "categoryHref" | "heroImage" | "href">> = {
  "business/bookkeeping": {
    category: "business",
    slug: "bookkeeping",
    title: "Bookkeeping Services",
    summary: "Reliable bookkeeping that keeps your Australian business records accurate, timely and ready for BAS, tax and management decisions.",
    overview: "We help small businesses keep day-to-day transactions organised across bank feeds, invoices, bills, reconciliations and monthly reporting. Our approach is practical and ATO-aware, giving you clean records and useful numbers without adding admin burden.",
    bestFor: ["Small businesses wanting accurate monthly accounts", "Owners moving from manual records to cloud software", "Businesses preparing for BAS or year-end tax"],
    inclusions: ["Bank, debtor and creditor reconciliations", "Sales invoice and supplier bill processing", "Monthly profit and loss and balance sheet checks", "GST coding review and BAS-ready workpapers"],
    process: ["Review your current file and bookkeeping process", "Clean up accounts, settings and opening balances", "Set a monthly bookkeeping rhythm and reporting pack", "Coordinate BAS and tax requirements with your accountant"],
  },
  "business/financial-reporting": {
    category: "business",
    slug: "financial-reporting",
    title: "Financial Reporting",
    summary: "Clear financial reports that help you understand profit, cash flow, margins and business performance.",
    overview: "Good reporting turns accounting data into decisions. We prepare tailored management reports for Australian businesses, highlighting trends, cost movements and tax considerations so you can plan with confidence.",
    bestFor: ["Growing businesses that need monthly insights", "Directors requiring clean management accounts", "Owners preparing budgets, finance applications or reviews"],
    inclusions: ["Profit and loss, balance sheet and cash flow reports", "Key ratio and margin analysis", "Budget-to-actual comparisons", "Management commentary and action points"],
    process: ["Confirm your reporting goals and key drivers", "Validate bookkeeping data and reporting structure", "Prepare reports in a simple, consistent format", "Discuss results and next steps with management"],
  },
  "business/bas-ias-lodgement": {
    category: "business",
    slug: "bas-ias-lodgement",
    title: "BAS & IAS Lodgement",
    summary: "Accurate BAS and IAS preparation for GST, PAYG instalments and ATO lodgement obligations.",
    overview: "We prepare and lodge Business Activity Statements and Instalment Activity Statements with careful GST coding checks and practical reminders around due dates and payments. Our service helps reduce ATO risk and keeps cash flow planning front of mind.",
    bestFor: ["GST-registered businesses", "Employers reporting PAYG withholding", "Businesses wanting dependable ATO lodgement support"],
    inclusions: ["GST transaction review", "PAYG instalment and withholding checks", "BAS/IAS preparation and lodgement", "ATO payment deadline reminders"],
    process: ["Collect records and review the accounting file", "Check GST treatment and reconcile key accounts", "Prepare BAS or IAS for approval", "Lodge with the ATO and confirm payment details"],
  },
  "business/payroll-stp": {
    category: "business",
    slug: "payroll-stp",
    title: "Payroll & STP Services",
    summary: "Payroll processing and Single Touch Payroll support for compliant Australian employee reporting.",
    overview: "We assist with regular payroll, employee setup, leave, superannuation and STP reporting. The goal is to pay staff correctly, meet ATO reporting rules and maintain records that support year-end finalisation.",
    bestFor: ["Employers with weekly, fortnightly or monthly payroll", "Businesses setting up STP reporting", "Owners needing help with payroll compliance"],
    inclusions: ["Employee onboarding and payroll setup", "Pay run processing and payslips", "STP reporting and year-end finalisation", "Leave, allowance and deduction checks"],
    process: ["Confirm award, employment and payroll settings", "Set up employees and recurring pay templates", "Process payroll and submit STP", "Review super and year-end obligations"],
  },
  "business/superannuation": {
    category: "business",
    slug: "superannuation",
    title: "Superannuation Support",
    summary: "Practical superannuation support for employer contributions, clearing house payments and compliance deadlines.",
    overview: "Superannuation is a key employer obligation in Australia. We help reconcile super payable, prepare contribution reports and support on-time payments to reduce late payment risk and improve payroll accuracy.",
    bestFor: ["Employers wanting orderly super contribution processes", "Businesses reconciling super payable accounts", "Payroll teams needing quarterly deadline support"],
    inclusions: ["Super contribution reconciliation", "Clearing house payment preparation", "Super guarantee deadline reminders", "Payroll and super account checks"],
    process: ["Review payroll settings and super categories", "Reconcile super liabilities", "Prepare payment reports for approval", "Maintain records for future checks"],
  },
  "business/accounting-software-setup": {
    category: "business",
    slug: "accounting-software-setup",
    title: "Accounting Software Setup",
    summary: "Cloud accounting setup for Xero, MYOB or QuickBooks with clean accounts, bank feeds and practical workflows.",
    overview: "The right software setup saves time and improves reporting. We configure your chart of accounts, GST settings, bank feeds, invoice templates and user access so your accounting system supports everyday operations.",
    bestFor: ["New businesses moving to cloud accounting", "Businesses with messy or outdated files", "Owners wanting better automation and reporting"],
    inclusions: ["Chart of accounts and GST settings", "Bank feed and invoice template setup", "Opening balance and conversion support", "Basic training for owners and staff"],
    process: ["Choose the right platform and subscription", "Configure settings and business details", "Import balances, contacts and bank feeds", "Train users and document the workflow"],
  },
  "business/advisory": {
    category: "business",
    slug: "advisory",
    title: "Business Advisory",
    summary: "Commercial accounting advice for cash flow, pricing, growth planning and business improvement.",
    overview: "Our advisory service helps business owners interpret their numbers and make practical decisions. We focus on Australian small business realities: cash flow, tax timing, margins, systems and sustainable growth.",
    bestFor: ["Owners wanting more than compliance work", "Businesses planning growth or restructuring", "Directors needing regular finance guidance"],
    inclusions: ["Cash flow and budget planning", "Pricing and margin review", "KPI dashboards and management reporting", "Business structure and tax discussion support"],
    process: ["Clarify business goals and current challenges", "Review financial results and key drivers", "Prepare practical recommendations", "Meet regularly to track progress"],
  },
  "entity/company-registration": {
    category: "entity",
    slug: "company-registration",
    title: "Company Registration",
    summary: "Company registration support for Australian businesses, including ASIC setup and key tax registrations.",
    overview: "We help establish proprietary companies with the correct ASIC details, officeholder information and tax registrations. This creates a clean foundation for trading, banking and compliance.",
    bestFor: ["New business owners choosing a company structure", "Existing sole traders moving into a company", "Founders needing ASIC and tax setup guidance"],
    inclusions: ["ASIC company registration guidance", "Director, shareholder and address details review", "ABN, TFN and GST registration coordination", "Initial compliance checklist"],
    process: ["Confirm structure and ownership details", "Prepare registration information", "Complete ASIC and tax registrations", "Provide setup documents and next steps"],
  },
  "entity/trust-setup": {
    category: "entity",
    slug: "trust-setup",
    title: "Trust Establishment",
    summary: "Trust setup coordination for family, unit or discretionary trust structures in Australia.",
    overview: "Trusts can be useful for asset ownership, family business planning and tax flexibility, but they must be established and administered carefully. We coordinate the accounting and registration steps with a practical compliance focus.",
    bestFor: ["Family businesses considering a trust", "Investors planning asset ownership", "Businesses needing distribution and tax planning flexibility"],
    inclusions: ["Trust type and accounting considerations", "Coordination of trust deed preparation", "ABN, TFN and GST registration support", "Trust bank account and recordkeeping checklist"],
    process: ["Discuss goals and suitable trust type", "Coordinate deed and trustee details", "Register tax accounts where required", "Set up accounting records and compliance dates"],
  },
  "entity/corporate-trustee-setup": {
    category: "entity",
    slug: "corporate-trustee-setup",
    title: "Corporate Trustee Setup",
    summary: "Corporate trustee setup for trusts requiring a company trustee and cleaner governance.",
    overview: "A corporate trustee can improve administration and continuity for many trust structures. We help coordinate the company registration, trustee details and accounting setup so the structure is ready to operate.",
    bestFor: ["Discretionary or unit trusts using a company trustee", "Business owners wanting clearer control and succession", "Investors establishing a trust structure"],
    inclusions: ["Corporate trustee company setup", "ASIC details and officeholder review", "Trustee appointment coordination", "Accounting and register checklist"],
    process: ["Confirm trust and trustee requirements", "Register or review the trustee company", "Coordinate trustee appointment documents", "Set up records for ongoing compliance"],
  },
  "entity/abn-tfn-registration": {
    category: "entity",
    slug: "abn-tfn-registration",
    title: "ABN & TFN Registration",
    summary: "ABN and TFN registration support for companies, trusts, partnerships and sole traders.",
    overview: "Correct Australian Business Number and Tax File Number registrations are essential before trading, invoicing or opening accounts. We help ensure your entity details, activities and responsible persons are recorded correctly.",
    bestFor: ["New entities ready to trade", "Sole traders starting a business", "Companies or trusts needing tax registrations"],
    inclusions: ["Entity detail and eligibility review", "ABN application support", "TFN registration support", "ATO account setup guidance"],
    process: ["Collect identity and entity information", "Confirm business activity and structure", "Submit ABN and TFN registrations", "Provide confirmation and next-step checklist"],
  },
  "entity/gst-registration": {
    category: "entity",
    slug: "gst-registration",
    title: "GST Registration",
    summary: "GST registration and setup advice for Australian businesses reaching or expecting taxable turnover requirements.",
    overview: "GST affects pricing, invoicing, bookkeeping and BAS lodgements. We help register your business, configure accounting software and explain what records you need to keep.",
    bestFor: ["Businesses approaching the GST turnover threshold", "New businesses choosing to register from the start", "Owners needing GST setup in accounting software"],
    inclusions: ["GST registration timing discussion", "ATO registration support", "GST tax code and invoice setup", "BAS reporting guidance"],
    process: ["Confirm GST requirement and start date", "Complete registration with the ATO", "Update invoicing and accounting settings", "Explain ongoing BAS obligations"],
  },
  "entity/payg-registration": {
    category: "entity",
    slug: "payg-registration",
    title: "PAYG Registration",
    summary: "PAYG instalment registration and guidance for businesses and taxpayers with expected income tax instalments.",
    overview: "PAYG instalments help prepay income tax during the year. We assist with registration, ATO correspondence and instalment planning so cash flow is managed before tax time.",
    bestFor: ["Businesses expecting tax instalments", "Entities receiving ATO PAYG instalment notices", "Owners wanting tax cash flow planning"],
    inclusions: ["PAYG instalment registration support", "Instalment rate and amount review", "ATO correspondence assistance", "Cash flow planning around due dates"],
    process: ["Review business income and tax position", "Confirm registration requirement", "Set up PAYG instalment reporting", "Monitor instalments during the year"],
  },
  "entity/payg-withholding-registration": {
    category: "entity",
    slug: "payg-withholding-registration",
    title: "PAYG Withholding Registration",
    summary: "PAYG withholding registration for employers who need to withhold tax from employee wages or contractor payments.",
    overview: "If you employ staff, PAYG withholding and STP reporting must be set up correctly. We register the obligation and align it with payroll, BAS and ATO reporting processes.",
    bestFor: ["Businesses hiring their first employee", "Companies setting up payroll", "Employers needing PAYG withholding on BAS"],
    inclusions: ["PAYG withholding registration", "Payroll and STP setup guidance", "BAS reporting alignment", "Due date and recordkeeping checklist"],
    process: ["Confirm employment and payroll needs", "Register PAYG withholding with the ATO", "Configure payroll reporting settings", "Explain BAS and STP responsibilities"],
  },
  "entity/business-name-registration": {
    category: "entity",
    slug: "business-name-registration",
    title: "Business Name Registration",
    summary: "Business name registration support for sole traders, companies and trusts trading under a registered name.",
    overview: "We help check business name requirements, align ownership details and coordinate registration so your trading name matches your accounting and tax records.",
    bestFor: ["New businesses choosing a trading name", "Existing entities adding a new brand", "Owners wanting ASIC and ABN details aligned"],
    inclusions: ["Business name requirement review", "ASIC registration support", "ABN linkage guidance", "Renewal and recordkeeping reminders"],
    process: ["Confirm entity owner and proposed name", "Check registration details", "Complete ASIC registration", "Update accounting and tax records"],
  },
  "entity/asic-compliance": {
    category: "entity",
    slug: "asic-compliance",
    title: "ASIC Compliance & Reporting",
    summary: "ASIC compliance support for annual statements, company changes and corporate recordkeeping.",
    overview: "Australian companies must keep ASIC details current and respond to annual statements. We help directors manage deadlines, review company records and coordinate changes where required.",
    bestFor: ["Company directors managing ASIC obligations", "Businesses with changes to officeholders or addresses", "Owners wanting annual statement support"],
    inclusions: ["Annual statement review reminders", "Company detail change coordination", "ASIC fee and deadline guidance", "Corporate register recordkeeping support"],
    process: ["Review current ASIC records", "Identify changes or annual statement actions", "Prepare required updates", "Maintain records for future compliance"],
  },
  "tax/individual-tax-returns": {
    category: "tax",
    slug: "individual-tax-returns",
    title: "Individual Tax Returns",
    summary: "Personal tax return preparation for Australian residents, employees, investors and sole income earners.",
    overview: "We prepare individual tax returns with careful review of income, deductions, offsets and ATO pre-fill information. Our process is designed to be straightforward while helping you claim what you are entitled to.",
    bestFor: ["Employees lodging annual tax returns", "Individuals with multiple income sources", "Taxpayers wanting professional deduction review"],
    inclusions: ["ATO pre-fill and income review", "Work-related deduction assessment", "Private health and offset checks", "Tax return preparation and lodgement"],
    process: ["Collect income and deduction information", "Review ATO pre-fill and supporting records", "Prepare and explain your tax outcome", "Lodge with the ATO after approval"],
  },
  "tax/rental-property-tax": {
    category: "tax",
    slug: "rental-property-tax",
    title: "Rental Property Tax Services",
    summary: "Rental property tax return support for landlords, investors and property owners in Australia.",
    overview: "Rental property tax can involve interest, repairs, depreciation, capital works and apportionment. We review your records and help report rental income and deductions correctly.",
    bestFor: ["Landlords with one or more rental properties", "Investors with loan interest and expense records", "Owners preparing for sale or CGT events"],
    inclusions: ["Rental income and expense review", "Loan interest and ownership apportionment", "Depreciation and capital works discussion", "Tax return schedules and lodgement"],
    process: ["Collect agent statements and expense records", "Review deductible and capital items", "Prepare rental schedules", "Discuss tax result and future recordkeeping"],
  },
  "tax/capital-gains-tax": {
    category: "tax",
    slug: "capital-gains-tax",
    title: "Capital Gains Tax Services",
    summary: "CGT calculations and advice for property, shares, crypto and other Australian capital assets.",
    overview: "Capital gains tax outcomes depend on cost base records, ownership, timing and available concessions. We help calculate gains or losses and explain the tax impact before or after a disposal.",
    bestFor: ["Investors selling shares, ETFs or crypto", "Property owners selling an investment property", "Taxpayers needing cost base and discount review"],
    inclusions: ["CGT event and ownership review", "Cost base and proceeds calculation", "Discount and loss application", "Tax return reporting support"],
    process: ["Collect purchase, sale and cost records", "Confirm asset ownership and dates", "Calculate capital gain or loss", "Report the CGT outcome in your return"],
  },
  "tax/investment-income-tax": {
    category: "tax",
    slug: "investment-income-tax",
    title: "Investment Income Tax Services",
    summary: "Tax reporting for dividends, managed funds, interest, foreign income and investment portfolios.",
    overview: "Investment income often includes franking credits, distributions, foreign tax credits and year-end tax statements. We help organise the information and report it accurately in your Australian tax return.",
    bestFor: ["Share and ETF investors", "Managed fund or trust distribution recipients", "Individuals with foreign investment income"],
    inclusions: ["Dividend and franking credit review", "Managed fund tax statement reporting", "Interest and foreign income checks", "Investment deduction discussion"],
    process: ["Collect annual tax statements", "Match income to ATO pre-fill", "Review credits, deductions and foreign amounts", "Prepare and lodge your return"],
  },
  "tax/sole-trader-tax": {
    category: "tax",
    slug: "sole-trader-tax",
    title: "Sole Trader Tax Returns",
    summary: "Tax return and business schedule support for Australian sole traders and freelancers.",
    overview: "We help sole traders report business income, claim eligible expenses, manage GST where relevant and understand tax instalments. The service combines personal tax and small business accounting knowledge.",
    bestFor: ["Freelancers and contractors", "Small sole trader businesses", "Individuals with ABN business income"],
    inclusions: ["Business income and expense review", "Home office, motor vehicle and equipment deductions", "GST and BAS alignment where relevant", "PAYG instalment planning discussion"],
    process: ["Review business records and bank summaries", "Identify deductible expenses and private use adjustments", "Prepare business schedule and tax return", "Plan future tax and recordkeeping"],
  },
  "tax/planning-advice": {
    category: "tax",
    slug: "planning-advice",
    title: "Tax Planning & Advice",
    summary: "Forward-looking tax planning for individuals, investors and sole traders before the end of the financial year.",
    overview: "Tax planning works best before 30 June. We review your income, deductions, investments and business position to identify practical steps and avoid surprises at lodgement time.",
    bestFor: ["Individuals expecting a higher tax bill", "Investors planning disposals or contributions", "Sole traders wanting cash flow certainty"],
    inclusions: ["Income and deduction estimate", "Super, investment and timing discussions", "CGT and rental property planning", "Clear action list before year end"],
    process: ["Estimate your current year tax position", "Review available planning options", "Discuss risks, timing and cash flow", "Provide an action plan and follow-up support"],
  },
};

export const serviceDetails: ServiceDetail[] = navigationServices.flatMap((group) => {
  const category = group.href.split("/").pop() as ServiceCategorySlug;
  const meta = categoryMeta[category];

  return group.items.map((item) => {
    const slug = item.href.split("/").pop() ?? "";
    const key = `${category}/${slug}`;
    const detail = details[key];

    if (!detail) {
      throw new Error(`Missing service detail for ${key}`);
    }

    return {
      ...detail,
      categoryTitle: meta.title,
      categoryHref: meta.href,
      heroImage: meta.heroImage,
      href: item.href,
    };
  });
});

export function getServiceDetail(category: string, slug: string) {
  return serviceDetails.find((service) => service.category === category && service.slug === slug) ?? null;
}

export function getServicesByCategory(category: ServiceCategorySlug) {
  return serviceDetails.filter((service) => service.category === category);
}

export function getCategoryMeta(category: ServiceCategorySlug) {
  return categoryMeta[category];
}
