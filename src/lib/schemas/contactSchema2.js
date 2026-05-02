import { z } from 'zod';

export const createContactSchema2 = (lang) => {
  const ar = lang === "ar";
  return z.object({
    organizationName: z.string().min(1, ar ? 'اسم المؤسسة مطلوب' : 'Organization name is required'),
    address: z.string().min(1, ar ? 'العنوان مطلوب' : 'Address is required'),
    state: z.string().optional(),
    city: z.string().min(1, ar ? 'المدينة مطلوبة' : 'City is required'),
    postalCode: z.string().min(1, ar ? 'الرمز البريدي مطلوب' : 'Postal code is required'),
    country: z.string().min(1, ar ? 'الدولة مطلوبة' : 'Country is required'),
    contactName: z.string().min(1, ar ? 'الاسم مطلوب' : 'Contact name is required'),
    contactPhone: z.string().min(1, ar ? 'رقم الهاتف مطلوب' : 'Contact phone is required'),
    contactMail: z.string().min(1, ar ? 'البريد الإلكتروني مطلوب' : 'Email is required').email(ar ? 'بريد إلكتروني غير صحيح' : 'Please enter a valid email'),
    isoStandard: z.string().min(1, ar ? 'اختر المعيار' : 'Please select a standard'),
    scopeOfCertification: z.string().min(1, ar ? 'نطاق الشهادة مطلوب' : 'Scope is required'),
    certificationType: z.string().min(1, ar ? 'نوع الشهادة مطلوب' : 'Certification type is required'),
    comments: z.string().min(1, ar ? 'الملاحظات مطلوبة' : 'Please add your comments or questions'),
  });
};