export default function CustomTabs({ tabs, activeTap, setActiveTap, componentRight }) {
  return (
    <div className=" border-b-1 border-inActive px-20  gap-4 flex flex-row justify-between flex-wrap">
      <ul className="flex flex-wrap ">
        {tabs &&
          tabs.map((tab, index) => {
            const { Icon, item } = tab;
            return (
              <li
                key={`${index}-${item}
              `}
                className="hover:bg-primaryLight hover: rounded-t-4 min-w-128"
              >
                <button
                  className={`flex flex-wrap gap-5 leading-6 text-sm p-8  w-full ${
                    index === activeTap
                      ? 'text-primary  font-semibold border-b-2 border-primary '
                      : 'text-inActive font-normal'
                  }`}
                  onClick={() => setActiveTap(index)}
                  type="button"
                >
                  {Icon && <Icon />}
                  {item}
                </button>
              </li>
            );
          })}
      </ul>
      {componentRight && componentRight}
    </div>
  );
}
