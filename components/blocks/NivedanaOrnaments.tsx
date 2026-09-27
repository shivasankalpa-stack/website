/**
 * Decorative ornaments for the Nivedana patra on the Maharudra page:
 *   - a gold lotus medallion that sits on the top border (the nivedana
 *     is offered at the Jagadgurus' lotus feet)
 *   - a floral corner piece, mirrored into all four corners
 *
 * Pure decoration: hidden from assistive technology. Colours come from
 * `currentColor`, set in globals.css (.nv-medallion, .nv-corner).
 */

function Lotus() {
  return (
    <svg viewBox="0 0 64 52" fill="currentColor" aria-hidden="true">
      {/* outer petals */}
      <path d="M32 38 C22 39 11 33 6 22 C17 21 27 28 32 38Z" opacity="0.65" />
      <path d="M32 38 C42 39 53 33 58 22 C47 21 37 28 32 38Z" opacity="0.65" />
      {/* inner petals */}
      <path d="M32 38 C24 33 18 23 20 12 C28 16 33 27 32 38Z" opacity="0.85" />
      <path d="M32 38 C40 33 46 23 44 12 C36 16 31 27 32 38Z" opacity="0.85" />
      {/* centre petal */}
      <path d="M32 4 C39 14 39 28 32 38 C25 28 25 14 32 4Z" />
      {/* water */}
      <path d="M12 43 Q32 50 52 43" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 48 Q32 52 44 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/** One arm of the corner vine, running along the top edge. */
function VineArm() {
  return (
    <g>
      <path d="M28 15 C38 8 46 19 57 12 S72 5 88 10" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M43 14 C45 7 51 4 55 5 C53 10 48 14 43 14Z" opacity="0.85" />
      <path d="M49 16 C53 17 57 21 57 25 C53 24 50 20 49 16Z" opacity="0.6" />
      <path d="M66 8 C70 12 70 17 68 20 C65 17 64 12 66 8Z" opacity="0.7" />
      <path d="M76 9 C79 5 83 4 86 5 C84 8 80 10 76 9Z" opacity="0.6" />
      <circle cx="90" cy="10" r="2" />
      <circle cx="35" cy="10" r="1.3" opacity="0.7" />
      <circle cx="61" cy="17" r="1.1" opacity="0.6" />
    </g>
  );
}

function Corner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg className={`nv-corner nv-corner-${position}`} viewBox="0 0 96 96" fill="currentColor" aria-hidden="true">
      <VineArm />
      {/* same arm reflected across the diagonal, down the side edge */}
      <g transform="matrix(0 1 1 0 0 0)">
        <VineArm />
      </g>
      {/* small bud on the diagonal */}
      <circle cx="33" cy="33" r="2.2" opacity="0.75" />
      <circle cx="39" cy="39" r="1.4" opacity="0.55" />
      {/* corner flower */}
      <g transform="translate(19 19)">
        {petals.map((deg, i) => (
          <path
            key={deg}
            d="M0 0 C4.5 -5 4.5 -11 0 -15 C-4.5 -11 -4.5 -5 0 0Z"
            transform={`rotate(${deg})`}
            opacity={i % 2 === 0 ? 0.95 : 0.6}
          />
        ))}
        <circle r="4.5" className="nv-corner-eye" />
        <circle r="2.6" />
      </g>
    </svg>
  );
}

export function NivedanaOrnaments() {
  return (
    <>
      <span className="nv-medallion" aria-hidden="true">
        <Lotus />
      </span>
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
    </>
  );
}
