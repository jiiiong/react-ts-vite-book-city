import { DetailCatelog } from "./components/DetailCatelog";
import { DetailInfo } from "./components/DetailInfo";
import { DetailNavbar } from "./components/DetailNavbar";

export function DetaiHeader() {
  return (
    <div
      className="
        bg-gradient-to-b from-[#ecf4f9] to-[rgba(236, 244,249,0)]
        p-ygm-l pt-[45px] relative">
      <DetailNavbar />
      <DetailInfo />
      {/**divider */}
      <div className="h-[1px] bg-ygm-border mb-ygm-l"></div>
      <DetailCatelog />
    </div>
  );
}
