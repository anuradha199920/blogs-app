export const cx = (classNames: any[]) =>
  classNames.filter(Boolean).join(" ");

  export const myLoader = ({ src }:any) => {
    return src;
  };
  