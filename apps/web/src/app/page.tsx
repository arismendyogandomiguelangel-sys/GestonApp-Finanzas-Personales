import Link from "next/link";
import { headers } from "next/headers";
import { isDemoMode } from "@/lib/demoMode";
import { DEFAULT_USER_SETTINGS } from "@/lib/locale";
import { getLocaleCookie } from "@/lib/localeCookie";
import { t } from "@/i18n/serverT";
import { extractUserIdFromHeaders, extractWorkspaceIdFromHeaders } from "@/server/userId";
import { getUserSettings } from "@/server/userSettings";
import styles from "./page.module.css";

const INCOME_CHANNELS = [
  {
    id: "iguala",
    name: "Iguala Fija (Servicios)",
    amount: "RD$ 15,000.00",
    share: "10%",
    progress: 10,
    frequency: "Mensual · Contrato Fijo",
    icon: "💼",
  },
  {
    id: "tienda",
    name: "Tienda Online (E-Commerce)",
    amount: "RD$ 68,400.00",
    share: "41%",
    progress: 41,
    frequency: "+18.2% vs. mes anterior",
    icon: "🛍️",
  },
  {
    id: "contables",
    name: "Servicios Contables & Fiscales",
    amount: "RD$ 48,000.00",
    share: "29%",
    progress: 29,
    frequency: "Honorarios por iguala / consulta",
    icon: "📊",
  },
  {
    id: "youtube",
    name: "Canales de YouTube (Contenido)",
    amount: "RD$ 34,200.00",
    share: "20%",
    progress: 20,
    frequency: "USD 580.00 · Tasa cambio al día",
    icon: "▶️",
  },
];

const CATEGORIES_IHA = [
  {
    id: "tx",
    href: "/transactions",
    title: "Registro financiero diario",
    desc: "Ingresos por iguala/YouTube/Tienda y gastos. OCR automático de facturas para extraer NCF y RNC.",
    badge: "B",
    icon: "📄",
  },
  {
    id: "budget",
    href: "/budget",
    title: "Presupuesto y Control de Metas",
    desc: "Define topes mensuales por categoría, margen neto operativo y notas de decisión fiscal.",
    badge: "C",
    icon: "🎯",
  },
  {
    id: "balances",
    href: "/balances",
    title: "Cuentas, Liquidez y Diáspora",
    desc: "Saldos en DOP, USD y EUR para tus canales digitales. Conversión automática con tasa del día.",
    badge: "D",
    icon: "💳",
  },
  {
    id: "agent",
    href: "/asistente",
    title: "Asistente IA: Axelin / ALIAS",
    desc: "Tu brazo contable inteligente. Habla con tu servidor Hermes MCP sin abandonar la vista del canvas.",
    badge: "E",
    icon: "🧠",
  },
  {
    id: "dashboards",
    href: "/dashboards",
    title: "Panel de Tendencias y Gráficos",
    desc: "Explora la evolución de tus 4 canales de ingreso y analiza tu rendimiento operativo mes a mes.",
    badge: "D",
    icon: "📈",
  },
  {
    id: "fiscal",
    href: "/fiscal",
    title: "DGII (606 / 607) y Obligaciones",
    desc: "Generación de formatos fiscales verificados con ITBIS facturado, listos para tu declaración mensual.",
    badge: "F",
    icon: "🏛️",
  },
];

export default async function HomePage() {
  const demo = await isDemoMode();
  let locale = DEFAULT_USER_SETTINGS.locale;
  if (demo) {
    locale = await getLocaleCookie();
  } else {
    try {
      const headersList = await headers();
      const userId = extractUserIdFromHeaders(headersList);
      const workspaceId = extractWorkspaceIdFromHeaders(headersList);
      const initialLocale = await getLocaleCookie();
      const settings = await getUserSettings(userId, workspaceId, initialLocale);
      locale = settings.locale;
    } catch {
      locale = await getLocaleCookie();
    }
  }

  return (
    <main className={`container ${styles.hubContainer}`}>
      {/* Banner Principal del Ecosistema Hermes */}
      <section className={styles.welcomeBanner}>
        <div className={styles.welcomeHeader}>
          <div>
            <h1 className={styles.welcomeTitle}>
              Brazo Contable y Financiero — Ecosistema Hermes
            </h1>
            <p className={styles.welcomeSub}>
              Plataforma para visualizar, registrar, calcular obligaciones fiscales DGII y gestionar tus 4 fuentes de ingreso. 
              Tu servidor Hermes se coordina desde el back con Ollama y IA en la nube.
            </p>
          </div>

          <div className={styles.hermesStatusBadge} title="Servidor Hermes conectado vía MCP">
            <span className={styles.pulseDot} />
            <span>Hermes MCP Activo · Servidor Conectado</span>
          </div>
        </div>
      </section>

      {/* Centro de Captura OCR (Cloudinary + Gemini/OpenAI) y DGII 606/607 */}
      <section className={styles.commandGrid} aria-label="Captura de facturas y estatus DGII">
        <div className={styles.commandCard}>
          <div className={styles.commandCardHeader}>
            <h2 className={styles.commandCardTitle}>
              <span>📸 Captura OCR de Facturas & Vouchers</span>
            </h2>
            <Link href="/vouchers" style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
              Ver todas →
            </Link>
          </div>

          <Link href="/vouchers" className={styles.ocrDropzone} style={{ textDecoration: "none" }}>
            <div className={styles.ocrIcon}>📑</div>
            <p className={styles.ocrText}>Tomar foto o soltar comprobante para OCR</p>
            <p className={styles.ocrSubText}>
              Extracción automática con Gemini/OpenAI · Almacenamiento seguro en Cloudinary
            </p>
          </Link>

          <div className={styles.ocrPillsRow}>
            <span className={styles.ocrPill}>✅ RNC & NCF detectado</span>
            <span className={styles.ocrPill}>📊 ITBIS Facturado: RD$ 18,450</span>
            <span className={styles.ocrPill}>🏛️ Listo para 606 / 607 DGII</span>
          </div>
        </div>

        <div className={styles.commandCard}>
          <div className={styles.commandCardHeader}>
            <h2 className={styles.commandCardTitle}>
              <span>💡 Obligaciones Fiscales & Estado DGII</span>
            </h2>
            <Link href="/fiscal" style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
              Exportar formatos →
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBlockStart: "4px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "13.5px", color: "var(--text-secondary)" }}>Formato 606 (Compras e ITBIS pagado)</span>
              <strong style={{ fontSize: "15px", color: "var(--success)" }}>14 Comprobantes · Al día</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "13.5px", color: "var(--text-secondary)" }}>Formato 607 (Ventas por Iguala/Tienda)</span>
              <strong style={{ fontSize: "15px", color: "var(--text)" }}>RD$ 165,600.00 procesados</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <span style={{ fontSize: "13.5px", color: "var(--text-secondary)" }}>Estado de Envío DGII (Mes actual)</span>
              <span style={{ padding: "4px 10px", borderRadius: "99px", background: "var(--bg-subtle)", color: "var(--accent-strong)", fontSize: "12px", fontWeight: 700 }}>
                Pendiente cierre de mes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Gráficos de Rendimiento y Desglose de los 4 Canales de Ingreso Reales */}
      <section className={styles.channelsSection}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Métricas de Ingresos Multi-Canal</h2>
            <span className={styles.sectionSub}>
              Monitoreo en tiempo real de tus 4 fuentes de ingreso activas (Total del mes: RD$ 165,600.00)
            </span>
          </div>
          <Link href="/dashboards" style={{ fontSize: "13px", color: "var(--accent)", fontWeight: 700, textDecoration: "none" }}>
            Ver analytics en detalle →
          </Link>
        </div>

        <div className={styles.channelsGrid}>
          {INCOME_CHANNELS.map((ch) => (
            <div key={ch.id} className={styles.channelCard}>
              <div className={styles.channelTop}>
                <span className={styles.channelName}>
                  <span className={styles.channelIcon}>{ch.icon}</span>
                  {ch.name}
                </span>
                <span style={{ fontSize: "13px", fontWeight: 750, color: "var(--accent-strong)" }}>
                  {ch.share}
                </span>
              </div>

              <p className={styles.channelAmount}>{ch.amount}</p>

              <div className={styles.channelBarWrap}>
                <div
                  className={styles.channelBarFill}
                  style={{ width: `${ch.progress}%` }}
                />
              </div>

              <div className={styles.channelFooter}>
                <span>{ch.frequency}</span>
                <span style={{ color: "var(--success)" }}>Activo</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visualización Gráfica de Rendimiento Financiero (Curva SVG Stitch Lab) */}
      <section className={styles.visualChartBox}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Tendencia de Flujo de Efectivo & Operaciones</h2>
            <span className={styles.sectionSub}>Comparativa mensual de ingresos consolidados, gastos operativos y provisiones DGII</span>
          </div>
          <div style={{ display: "flex", gap: "16px", fontSize: "13px", fontWeight: 650 }}>
            <span style={{ color: "hsl(158, 76%, 45%)" }}>● Ingresos Multi-Canal</span>
            <span style={{ color: "hsl(252, 95%, 65%)" }}>● Gastos & ITBIS</span>
          </div>
        </div>

        <div className={styles.chartCanvas}>
          <svg className={styles.svgChart} viewBox="0 0 1000 220" preserveAspectRatio="none">
            <defs>
              <linearGradient id="incomeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(158, 76%, 45%)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="hsl(158, 76%, 45%)" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="hsl(252, 95%, 65%)" stopOpacity="0.30" />
                <stop offset="100%" stopColor="hsl(252, 95%, 65%)" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Curva de Gastos / ITBIS */}
            <path
              d="M 0 170 C 150 165, 300 130, 450 145 C 600 160, 750 110, 900 120 L 1000 115 L 1000 220 L 0 220 Z"
              fill="url(#expenseGrad)"
            />
            <path
              d="M 0 170 C 150 165, 300 130, 450 145 C 600 160, 750 110, 900 120 L 1000 115"
              fill="none"
              stroke="hsl(252, 95%, 65%)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Curva de Ingresos Consolidados (4 Canales) */}
            <path
              d="M 0 135 C 160 110, 320 140, 480 85 C 640 30, 800 65, 920 40 L 1000 35 L 1000 220 L 0 220 Z"
              fill="url(#incomeGrad)"
            />
            <path
              d="M 0 135 C 160 110, 320 140, 480 85 C 640 30, 800 65, 920 40 L 1000 35"
              fill="none"
              stroke="hsl(158, 76%, 45%)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Puntos de control visuales */}
            <circle cx="480" cy="85" r="5" fill="hsl(158, 76%, 45%)" />
            <circle cx="920" cy="40" r="6" fill="hsl(158, 76%, 45%)" />
            <circle cx="450" cy="145" r="5" fill="hsl(252, 95%, 65%)" />
            <circle cx="900" cy="120" r="5" fill="hsl(252, 95%, 65%)" />
          </svg>
        </div>
      </section>

      {/* Acceso Directo a los 6 Módulos Funcionales del Sistema */}
      <section style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Módulos del Ecosistema Hermes</h2>
            <span className={styles.sectionSub}>Accede directo a cada área de gestión financiera, OCR y fiscalidad</span>
          </div>
        </div>

        <div className={styles.categoryGrid}>
          {CATEGORIES_IHA.map((cat) => (
            <Link key={cat.id} href={cat.href} className={styles.categoryCard}>
              <div className={styles.categoryTop}>
                <div className={styles.categoryBadgeIcon}>
                  {cat.icon}
                </div>
                <div>
                  <h3 className={styles.categoryTitle}>{cat.title}</h3>
                  <p className={styles.categoryDesc}>{cat.desc}</p>
                </div>
              </div>

              <div className={styles.categoryFooter}>
                <span>Módulo {cat.badge} · Abrir sección</span>
                <span className={styles.arrowIcon}>→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
