import * as React from 'react'

function SvgBookReport(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="48px"
      height="48px"
      viewBox="0 0 512 512"
      data-name="Layer 1"
      {...props}
    >
      <linearGradient
        id="bookReport_svg__a"
        gradientUnits="userSpaceOnUse"
        x1={256}
        x2={256}
        y1={36}
        y2={472.073}
      >
        <stop offset={0} stopColor="#00efd1" />
        <stop offset={1} stopColor="#00acea" />
      </linearGradient>
      <linearGradient
        id="bookReport_svg__b"
        x1={256}
        x2={256}
        xlinkHref="#bookReport_svg__a"
        y1={36}
        y2={472.073}
      />
      <linearGradient
        id="bookReport_svg__c"
        x1={258}
        x2={258}
        xlinkHref="#bookReport_svg__a"
        y1={36}
        y2={472.073}
      />
      <path
        d="M215.985 285h-.185a5.816 5.816 0 00-5.729 4.007l-11.641 37.311a5.894 5.894 0 00.9 5.289 5.953 5.953 0 004.829 2.393h103.683a6 6 0 005.729-7.786L301.929 288.8a5.989 5.989 0 00-4.272-4.02l24.934-59.131a6.007 6.007 0 00-.326-5.322L261.2 114.086a6 6 0 00-10.4 0l-61.065 106.238a6.447 6.447 0 00-.268 5.668zm-3.676 37l7.908-25h71.565l7.909 25zM256 201.391a7.838 7.838 0 11-7.838 7.838 7.847 7.847 0 017.838-7.838zm-6-61.836v50.768a19.839 19.839 0 1012 0v-50.768l48.378 84.381L284.718 285h-55.569l-27.481-61.145z"
        fill="url(#bookReport_svg__a)"
      />
      <path
        d="M424.2 14H87.8C74.375 14 63 24 63 36.907v422.715c0 .13.224.008.224.138 0 21.223 18.282 38.24 40.477 38.24h296.035C413.162 498 424 488 424 475.1V434h.2c13.427 0 24.8-10.979 24.8-23.885V36.9C449 24 437.628 14 424.2 14zM412 475.1c0 6.286-5.455 10.9-12.264 10.9H103.7c-15.578 0-28.252-11.634-28.252-26.24v.047C75.633 445.347 88.236 434 103.7 434H412zm25-64.983C437 416.4 431.011 422 424.2 422H103.7A43.174 43.174 0 0075 432.617V36.907C75 30.619 80.991 26 87.8 26h336.4c6.81 0 12.8 4.616 12.8 10.9z"
        fill="url(#bookReport_svg__b)"
      />
      <path
        d="M396 66a6 6 0 00-6-6H126a6 6 0 00-6 6v315a6 6 0 006 6h264a6 6 0 006-6zm-11 310H132V72h253z"
        fill="url(#bookReport_svg__c)"
      />
    </svg>
  )
}

export default SvgBookReport
