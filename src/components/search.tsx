const Input: React.FC<{
  value: string;
  setvalue(e: any): void;
  setSubmit(value: any): void;
  children: string;
}> = ({ value, setvalue, setSubmit, children }) => {
  return (
    <div className="mt-6 flex items-center pl-4  ">
      <img className={`w-[24px] pb-[15px]`} src="/assets/icon-search.svg" />
      <form
        className=" ml-[20px] w-available mr-[36px]"
        onSubmit={(e) => {
          setSubmit(value);
          e.preventDefault();
        }}
      >
        <input
          className="pb-[15px] w-available  border-b-[1px] border-b-transparent  focus:border-b-[1px]  focus:border-b-solid  focus:border-b-gray  outline-none text-[16px] font-light bg-transparent text-white"
          type="text"
          placeholder={children}
          value={value}
          onChange={(e) => setvalue(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Input;
