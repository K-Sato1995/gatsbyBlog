import * as React from 'react'

function SvgMemo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48px"
      height="48px"
      data-name="Layer 1"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <linearGradient
          id="list_svg__a"
          x1={256}
          y1={18}
          x2={256}
          y2={492.152}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset={0} stopColor="#00efd1" />
          <stop offset={1} stopColor="#00acea" />
        </linearGradient>
        <linearGradient
          id="list_svg__b"
          x1={200.726}
          y1={18}
          x2={200.726}
          y2={492.152}
          xlinkHref="#list_svg__a"
        />
      </defs>
      <path
        d="M360.7 384H151.3a8 8 0 100 16h209.4a8 8 0 000-16zM360.7 348H151.3a8 8 0 100 16h209.4a8 8 0 000-16zM360.7 311H151.3a8 8 0 100 16h209.4a8 8 0 000-16zM360.7 274H151.3a8 8 0 100 16h209.4a8 8 0 000-16zM143.3 245a8 8 0 008 8h209.4a8 8 0 000-16H151.3a8 8 0 00-8 8z"
        fill="url(#list_svg__a)"
      />
      <path
        d="M143.3 208a8 8 0 008 8h98.855a8 8 0 000-16H151.3a8 8 0 00-8 8z"
        fill="url(#list_svg__b)"
      />
      <path
        d="M448 68H313.523a8.2 8.2 0 00-7.889-6h-19.261a37.442 37.442 0 006.185-20.515 36.558 36.558 0 10-73.116.048A37.28 37.28 0 00225.627 62h-19.261a8.2 8.2 0 00-7.889 6H64a8.3 8.3 0 00-8 8.342v422.924A7.777 7.777 0 0064 507h384a7.777 7.777 0 008-7.734V76.342A8.3 8.3 0 00448 68zM235.442 41.485a20.558 20.558 0 1141.116.048c0 10.333-7.669 18.467-17.61 20.467h-5.9c-9.937-2-17.606-10.183-17.606-20.515zM214 78h37.9c1.348 0 2.715.236 4.1.236s2.755-.236 4.1-.236H298v54h-84zm91.634 70a8.464 8.464 0 008.366-8.167V122h88v336H110V122h88v17.833a8.464 8.464 0 008.366 8.167zM440 491H72V84h126v22h-95.617c-4.418 0-8.383 3.181-8.383 7.6v352.2a8.509 8.509 0 008.383 8.2h307.234a8.509 8.509 0 008.383-8.2V113.6c0-4.418-3.965-7.6-8.383-7.6H314V84h126z"
        fill="url(#list_svg__a)"
      />
    </svg>
  )
}

export default SvgMemo
