export default function Container(props: any) {
  return (
    <div
      className="container px-8 mx-auto xl:px-5  max-w-screen-xl py-5 lg:py-8">
      {props.children}
    </div>
  );
}
