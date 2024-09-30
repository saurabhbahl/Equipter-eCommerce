function Loader({ span, roles = "status" }: { span: string; roles?: string }) {
  return (
    <div className="flex flex-col items-center w-full h-full justify-center">
      <div
        className="w-8 h-8 border-4 border-cyan rounded-full border-b-custom-orange animate-spin"
        role={roles}
      />
      <span className="ml-2">{span}</span>
    </div>
  );
}

export default Loader;
