import dynamic from "next/dynamic";

const DynamicCustomTitleBar = dynamic(() => import("./Titlebar"), {
  ssr: false,
});

export default DynamicCustomTitleBar;