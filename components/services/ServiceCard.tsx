"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Service {
  slug: string;
  title: string;
  titleNe: string;
  icon: string;
  color: string;
  shortDesc: string;
  price: string;
  duration: string;
}

export default function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      style={{
        background: "white", borderRadius: "24px", overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
        border: "1px solid rgba(255,153,51,0.1)", cursor: "pointer",
      }}
    >
      <div style={{ height: "6px", background: `linear-gradient(90deg, ${service.color}, ${service.color}88)` }} />

      <div style={{ padding: "32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", marginBottom: "16px" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "14px", flexShrink: 0,
            background: service.color + "18", border: `1px solid ${service.color}33`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
          }}>
            {service.icon}
          </div>
          <div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontWeight: 700, color: "#1a0f00", marginBottom: "2px" }}>
              {service.title}
            </h3>
            <p style={{ fontSize: "12px", color: service.color, fontFamily: "serif" }}>
              {service.titleNe}
            </p>
          </div>
        </div>

        <p style={{ fontSize: "14px", color: "rgba(26,15,0,0.6)", lineHeight: 1.7, marginBottom: "24px" }}>
          {service.shortDesc}
        </p>

        <div style={{
          display: "flex", gap: "16px", marginBottom: "24px",
          padding: "12px 16px", borderRadius: "12px",
          background: service.color + "0d", border: `1px solid ${service.color}22`,
        }}>
          <div>
            <div style={{ fontSize: "10px", color: "rgba(26,15,0,0.4)", letterSpacing: "1px", textTransform: "uppercase" }}>Price</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a0f00" }}>{service.price}</div>
          </div>
          <div style={{ width: "1px", background: service.color + "33" }} />
          <div>
            <div style={{ fontSize: "10px", color: "rgba(26,15,0,0.4)", letterSpacing: "1px", textTransform: "uppercase" }}>Duration</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#1a0f00" }}>{service.duration}</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <Link href={`/services/${service.slug}`} style={{
            flex: 1, textAlign: "center", padding: "10px", borderRadius: "10px",
            fontSize: "13px", fontWeight: 600, textDecoration: "none",
            color: service.color, border: `1px solid ${service.color}44`,
            background: service.color + "0d",
          }}>
            View Details
          </Link>
          <Link href="/booking" style={{
            flex: 1, textAlign: "center", padding: "10px", borderRadius: "10px",
            fontSize: "13px", fontWeight: 700, textDecoration: "none",
            color: "#1a0f00", background: `linear-gradient(135deg, ${service.color}, ${service.color}cc)`,
          }}>
            Book Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
}