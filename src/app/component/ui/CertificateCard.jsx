// "use client";
// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// function formatDate(dateStr) {
//   if (!dateStr) return "—";
//   return new Date(dateStr).toLocaleDateString("en-GB", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// const CERT_WIDTH = 580;

// export default function CertificateCard({ data }) {
//   const wrapperRef = useRef(null);
//   const [scale, setScale] = useState(1);

//   useEffect(() => {
//     const updateScale = () => {
//       if (wrapperRef.current) {
//         const availableWidth = wrapperRef.current.offsetWidth;
//         setScale(Math.min(1, availableWidth / CERT_WIDTH));
//       }
//     };

//     updateScale();
//     window.addEventListener("resize", updateScale);
//     return () => window.removeEventListener("resize", updateScale);
//   }, []);

//   return (
//     <div
//       ref={wrapperRef}
//       className="w-full overflow-hidden md:flex flex-col justify-center items-center"
//       style={{ height: `calc(${scale} * var(--cert-natural-height, auto))` }}
//     >
//       <div
//         className="origin-top-left"
//         style={{
//           transform: `scale(${scale})`,
//           width: `${CERT_WIDTH}px`,
//           transformOrigin: "top left",
//         }}
//       >
//         <div className="max-w-[580px] mx-auto flex border-2 border-[#1a6ab1] rounded-sm overflow-hidden bg-[url('/bg.jpeg')] bg-cover bg-no-repeat select-none">

//           {/* Sidebar */}
//           <div className="w-1/12 bg-[#1a6ab1] flex items-center justify-center shrink-0">
//             <span className="text-white text-[32px] font-medium tracking-widest whitespace-nowrap [writing-mode:vertical-rl] rotate-180" >
//               {data.iso_item?.name} Certificate
//             </span>
//           </div>

//           {/* Main */}
//           <div className="flex-1 flex flex-col">

//             {/* Top bar */}
//             <div className="flex items-center justify-between px-4 gap-5">
//               <div className="relative h-[100px] w-1/2">
//                 <Image src="/logo.png" alt="ABS Global" sizes="100%" fill className="object-contain" />
//               </div>
//               <span className="relative h-[100px] w-1/2">
//                 <Image src="/cert.png" alt="certificate Badge" sizes="100%" fill className="object-contain" />
//               </span>
//             </div>

//             {/* Body */}
//             <div className="flex-1 px-[18px] pb-0 pl-[14px]">

//               <p className="text-[11px] text-slate-700 font-semibold mb-1.5">
//                 ABS Global Certificate of Compliance
//               </p>

//               <div className="flex items-center justify-between gap-2.5 mb-2.5">
//                 <h2 className="text-[18px] font-extrabold text-slate-900 uppercase tracking-wide leading-tight m-0">
//                   {data.certifiable?.name}
//                 </h2>
//                 {data.certifiable?.logo && (
//                   <div className="relative w-[62px] h-[62px] border border-slate-300 rounded flex items-center justify-center shrink-0 overflow-hidden bg-white">
//                     <Image src={`${process.env.NEXT_PUBLIC_IMAGES}${data.certifiable?.logo}`} alt="Company Logo" sizes="100%" fill className="object-contain" />
//                   </div>
//                 )}
//               </div>

//               <p className="text-[11px] text-slate-500 leading-relaxed mb-2.5">
//                 This certificate authoritatively certifies the implementation and continuous advancement
//                 of an effective management system, which adheres to the requirements of the below:
//               </p>

//               <div className="text-[34px] font-extrabold text-slate-900 leading-none mb-0.5">
//                 {data.iso_item?.name}
//               </div>
//               <div className="text-[14px] font-bold text-slate-800 mb-3.5">
//                 {data.iso_item?.certificate_category}
//               </div>

//               {/* Details */}
//               {data.type === "published" ? (
//                 <div className="rounded p-2.5 mb-2.5 space-y-1.5">
//                   <div className="flex items-start text-[11.5px]">
//                     <span className="font-bold text-slate-900 min-w-[110px] shrink-0 pt-px">Address:</span>
//                     <span className="text-slate-800 leading-snug">{data.certifiable?.address}</span>
//                   </div>
//                   <div className="flex items-start text-[11.5px] py-2">
//                     {data.iso_item?.name === "UL 2900-2-3:2023" ? (
//                       <span className="font-bold text-slate-900 min-w-[110px] shrink-0 pt-px">Product:</span>
//                     ) : (
//                       <span className="font-bold text-slate-900 min-w-[110px] shrink-0 pt-px">Scope:</span>
//                     )}
//                     <span className="text-slate-800 leading-snug">{data.certifiable?.scope}</span>
//                   </div>
//                   <div className="flex items-start text-[11.5px]">
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Issue date:</span>
//                       <span className="text-slate-800">{formatDate(data.issue_date)}</span>
//                     </div>
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Valid until:</span>
//                       <span className="text-slate-800">{formatDate(data.valid_until)}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start text-[11.5px]">
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Initial issue date:</span>
//                       <span className="text-slate-800">{formatDate(data.initial_issue_date)}</span>
//                     </div>
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Expiry date:</span>
//                       <span className="text-slate-800">{formatDate(data.expiry_date)}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start text-[11.5px]">
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px leading-snug">Registration<br />No.:</span>
//                       <span className="font-bold text-slate-900">{data.registration_number}</span>
//                     </div>
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px leading-snug">IAF Code:</span>
//                       <span className="font-bold text-slate-900">{data.iaf_code}</span>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="relative rounded p-2.5 mb-2.5 space-y-1.5">
//                   <div className="absolute -top-13 left-0 text-[200px] font-extrabold text-[var(--primary-color)] shrink" style={{ fontFamily: "impact, sans-serif" }}>DRAFT</div>
//                   <div className="flex items-start text-[11.5px]">
//                     <span className="font-bold text-slate-900 min-w-[110px] shrink-0 pt-px">Address:</span>
//                     <span className="text-slate-800 leading-snug">{data.certifiable?.address}</span>
//                   </div>
//                   <div className="flex items-start text-[11.5px] py-2">
//                     <span className="font-bold text-slate-900 min-w-[110px] shrink-0 pt-px">Scope:</span>
//                     <span className="text-slate-800 leading-snug">{data.certifiable?.scope}</span>
//                   </div>
//                   <div className="flex items-start text-[11.5px]">
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Issue date:</span>
//                       <span className="text-slate-800">{formatDate(data.issue_date)}</span>
//                     </div>
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Valid until:</span>
//                       <span className="text-slate-800">{formatDate(data.valid_until)}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start text-[11.5px]">
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Initial issue date:</span>
//                       <span className="text-slate-800">{formatDate(data.initial_issue_date)}</span>
//                     </div>
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px">Expiry date:</span>
//                       <span className="text-slate-800">{formatDate(data.expiry_date)}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-start text-[11.5px]">
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px leading-snug">Registration<br />No.:</span>
//                       <span className="font-bold text-slate-900">{data.registration_number}</span>
//                     </div>
//                     <div className="flex flex-1">
//                       <span className="font-bold text-slate-900 w-[90px] shrink-0 pt-px leading-snug">IAF Code:</span>
//                       <span className="font-bold text-slate-900">{data.iaf_code}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Tallest line divider */}
//               <div className="mt-2.5 relative w-full h-1.5">
//                 <Image src="/tallest line.png" alt="footer" sizes="100%" fill className="object-contain" />
//               </div>

//             </div>

//             {/* Footer */}
//             <div className="grid grid-cols-3 gap-3 px-[18px] pl-[14px]">
//               <div>
//                 <Image
//                   src={data.logos?.signature}
//                   alt="Signature"
//                   width={150}
//                   height={80}
//                   className="object-contain w-10/12"
//                 />
//               </div>
//               <div className="col-span-2">
//                 <div className="grid grid-cols-4 gap-1.5">
//                   {data.qr_codes ? (
//                     <div className="flex flex-col items-center gap-2 relative h-24 w-full mt-1">
//                       <Image src={data.logos.iaf} alt="IAF" width={65} height={65} className="object-contain" />
//                       <Image src={`${process.env.NEXT_PUBLIC_IMAGES}${data.qr_codes}`} alt="QR Code" width={45} height={45} className="object-contain" />
//                     </div>
//                   ) : (
//                     <div className="relative h-24 w-full">
//                       <Image src={data.logos.iaf} alt="IAF" sizes="100%" fill className="object-contain" />
//                     </div>
//                   )}
//                   <div className="relative h-24 w-full">
//                     <Image src={data.logos.egac} alt="EGAC" sizes="100%" fill className="object-contain" />
//                   </div>
//                   <div className="relative h-24 w-full">
//                     <Image src={data.logos?.certificate} alt="ISO 9001" sizes="100%" fill className="object-contain" />
//                   </div>
//                   <div className="relative h-24 w-full">
//                     <Image src={data.logos["validate-qr"]} alt="QR Code" sizes="100%" fill className="object-contain" />
//                   </div>
//                 </div>
//                 <div className="mt-1">
//                   <Image
//                     src="/line.png"
//                     alt=""
//                     width={100}
//                     height={10}
//                     className="w-full h-auto block"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function CertificateCard({ data }) {
  const rows = [
    ["Certificate type", data.type === "published" ? "Published" : "Draft"],
    ["Company name", data.certifiable?.name],
    ["Address", data.certifiable?.address],
    [data.iso_item?.name === "UL 2900-2-3:2023" ? "Product" : "Scope", data.scope ?? data.certifiable?.scope],
    ["Standard", data.iso_item?.name],
    ["Category", data.iso_item?.certificate_category],
    ["Issue date", formatDate(data.issue_date)],
    ["Valid until", formatDate(data.valid_until)],
    ["Initial issue date", formatDate(data.initial_issue_date)],
    ["Expiry date", formatDate(data.expiry_date)],
    ["Registration no.", data.registration_number],
    ["IAF code", data.iaf_code],
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <tbody>
          {rows.map(([label, value], i) => (
            <tr key={label} className={i % 2 === 0 ? "bg-gray-50" : ""}>
              <td className="py-2.5 px-4 font-medium text-gray-500 w-2/5 align-top">
                {label}
              </td>
              <td className="py-2.5 px-4 text-gray-900 align-top break-words">
                {value || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}