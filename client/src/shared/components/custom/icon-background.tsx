import { AcademyIcon } from './academy-icon';

export function IconBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[#e9f2fc]" />
      <AcademyIcon
        arcColor="#a9e5ef"
        mainColor="#7fd9e6"
        className="fixed -bottom-[25.91%] -left-[27.06%] -z-2"
        height="118.62%"
        opacity={0.16}
      />
    </>
  );
}
