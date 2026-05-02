"use client";
import Image from "next/image";

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function CertificateCard({ data, lang = "en" }) {
  return (
    <div className="cert-wrapper">
      <div className="cert-card">

        {/* ── Left blue sidebar ── */}
        <div className="cert-sidebar">
          <span className="cert-sidebar-text">
            {data.iso_item?.name || "ISO"} Certificate
          </span>
        </div>

        {/* ── Main content ── */}
        <div className="cert-body">

          {/* Header */}
          <div className="cert-header">
            <div className="cert-logo-wrap">
              <Image src="/logo.png" alt="ABS Global" width={90} height={90} />
            </div>
            <div className="cert-header-center">
              <p className="cert-tagline">ABS Global Certificate of Compliance</p>
              <h2 className="cert-company">{data.company_name}</h2>
            </div>
            {data.company_logo && (
              <div className="cert-company-logo">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.company_logo}`}
                  alt={data.company_name}
                  className="w-[70px] h-[70px] object-contain"
                  onError={(e) => e.target.style.display = "none"}
                />
              </div>
            )}
          </div>

          {/* Certificate badge */}
          <div className="cert-badge-row">
            <div className="cert-badge">Certificate</div>
          </div>

          {/* Description */}
          <p className="cert-description">
            This certificate authoritatively certifies the implementation and continuous advancement
            of an effective management system, which adheres to the requirements of the below:
          </p>

          {/* ISO Standard */}
          <div className="cert-iso-name">{data.iso_item?.name}</div>
          <div className="cert-iso-category">{data.iso_item?.certificate_category}</div>

          <div className="cert-divider" />

          {/* Details grid */}
          <div className="cert-details">
            <div className="cert-detail-item cert-detail-full">
              <span className="cert-detail-label">Address:</span>
              <span className="cert-detail-value">{data.company_address}</span>
            </div>
            <div className="cert-detail-item cert-detail-full">
              <span className="cert-detail-label">Scope:</span>
              <span className="cert-detail-value">{data.scope}</span>
            </div>
            <div className="cert-detail-item">
              <span className="cert-detail-label">Issue date:</span>
              <span className="cert-detail-value">{formatDate(data.issue_date)}</span>
            </div>
            <div className="cert-detail-item">
              <span className="cert-detail-label">Valid until:</span>
              <span className="cert-detail-value">{formatDate(data.valid_until)}</span>
            </div>
            <div className="cert-detail-item">
              <span className="cert-detail-label">Initial issue date:</span>
              <span className="cert-detail-value">{formatDate(data.initial_issue_date)}</span>
            </div>
            <div className="cert-detail-item">
              <span className="cert-detail-label">Expiry date:</span>
              <span className="cert-detail-value">{formatDate(data.expiry_date)}</span>
            </div>
            <div className="cert-detail-item cert-detail-full">
              <span className="cert-detail-label">Registration No.:</span>
              <span className="cert-detail-value cert-reg-no">{data.registration_number}</span>
            </div>
          </div>

          <div className="cert-divider" />

          {/* Footer */}
          <div className="cert-footer">
            <div className="cert-footer-left">
              <div className="cert-signature">Salah Gomaa</div>
              <p className="cert-signer-name">Salah Gomaa</p>
              <p className="cert-signer-title">MANAGING DIRECTOR</p>
              <p className="cert-contact">+20233731792</p>
              <p className="cert-contact">+201026294642</p>
              <p className="cert-contact">info@absglobals.com</p>
              <p className="cert-contact">Hadayeq Alahram Giza, Egypt</p>
            </div>

            <div className="cert-footer-logos">
              {data.logos &&
                Object.entries(data.logos).map(([key, url]) => (
                  <img
                    key={key}
                    src={url.replace(
                      "http://localhost:8000",
                      process.env.NEXT_PUBLIC_BACKEND_URL || ""
                    )}
                    alt={key}
                    className="cert-accred-logo"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ))}
            </div>

            {data.qr_codes && (
              <div className="cert-qr">
                <img src={data.qr_codes} alt="QR Code" className="w-[80px] h-[80px]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}