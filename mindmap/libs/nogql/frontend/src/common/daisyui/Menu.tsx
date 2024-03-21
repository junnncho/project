"use client";
import { AiFillCaretDown, AiOutlineEllipsis } from "react-icons/ai";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type MenuItem = {
  label: ReactNode;
  key: string;
  path?: string;
  children?: MenuItem[];
  icon?: ReactNode;
  type?: string;
};

type MenuProps = {
  className?: string;
  style?: React.CSSProperties;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  mode?: "horizontal" | "inline";
  items: MenuItem[];
  onClick?: (item: MenuItem) => void;
  activeStyle?: "active" | "bordered";
};

export const Menu = ({
  items,
  onClick,
  selectedKeys,
  defaultSelectedKeys,
  className,
  style,
  mode = "inline",
  activeStyle = "active",
}: MenuProps) => {
  const [expandedKey, setExpandedKey] = useState<string>(); // 서브메뉴
  const [currentKey, setCurrentKey] = useState<string | null>(defaultSelectedKeys?.[0] || null); // 선택된 메뉴
  const [overflowMenuPos, setOverflowMenuPos] = useState<[number, number]>([0, 0]); // top, left. overflow menu의 위치
  const modeClassName = mode === "horizontal" ? "menu-horizontal flex-row" : "";
  const menuRef = useRef<HTMLDivElement | null>(null);
  const LiRefs = useRef<HTMLLIElement[]>([]);
  const innerWidth = window.innerWidth;

  // const subMenuClassName =
  //   mode === "horizontal"
  //     ? `z-50 absolute bottom-0 translate-y-[100%]  border-0 text-sm rounded-sm shadow-lg bg-white flex flex-col`
  //     : "flex flex-col gap-0 p-0 bg-color-main-50 hover:bg-color-main-50 overflow-hidden";

  const subMenuClassName =
    mode === "horizontal"
      ? `z-50 fixed bottom-0 translate-y-[100%]  border-0 text-sm rounded-sm shadow-lg bg-white flex flex-col`
      : "flex flex-col gap-0 p-0 bg-color-main-50 hover:bg-color-main-50 overflow-hidden";

  const subMenuItemClassName =
    mode === "inline" ? "w-full h-full p-2 pl-10 m-0 hover:bg-color-main-100" : "whitespace-nowrap";

  const activeClassName = activeStyle === "active" ? "[&>div]:bg-color-main-100 [&>div]:text-color-main" : "bordered";

  const [overflowMenuItems, setOverflowMenuItems] = useState<MenuItem[]>([]);

  // 브라우저 너비가 줄어들면, overflowMenuItems에 추가
  useEffect(() => checkOverflow(), [innerWidth]);

  const checkOverflow = useCallback(() => {
    if (mode !== "horizontal") return;
    const menu = menuRef.current;
    if (!menu) return;
    const liList = LiRefs.current;
    let newOverflowPosX = 100000;
    const newOverflowMenuItems: MenuItem[] = [];
    setOverflowMenuItems([]);
    liList.forEach((li) => {
      const liRight = li.getBoundingClientRect().right;
      const offset = 0;
      if (liRight + offset > menu.getBoundingClientRect().right) {
        newOverflowPosX = Math.min(newOverflowPosX, li.getBoundingClientRect().left);
        const id = li.getAttribute("id");
        const item = items.find((item) => item.key === id);
        item && newOverflowMenuItems.push(item);
      }
    });
    setOverflowMenuPos([liList[0].getBoundingClientRect().top, newOverflowPosX]);
    setOverflowMenuItems(newOverflowMenuItems);
  }, [items, mode]);

  const handleOnClick = (item: MenuItem) => {
    setCurrentKey(item.key);
    if (mode === "inline" && item.children) setExpandedKey(item.key === expandedKey ? undefined : item.key);
    else onClick?.(item);
  };

  const checkIsActive = (key: string) => {
    if (selectedKeys) return selectedKeys.includes(key);
    return key === currentKey;
  };

  return (
    <>
      <div ref={menuRef} id="menu" className="overflow-hidden shrink">
        <ul
          className={twMerge(" list-none h-full menu p-0 flex-nowrap", modeClassName, className)}
          style={{ ...style }}
        >
          {items.map((item, idx) => {
            const isOverflowItem = overflowMenuItems.some((overflowItem) => overflowItem.key === item.key);
            const overflowClassName = isOverflowItem ? "opacity-0" : "";
            return (
              <li
                ref={(el) => el && (LiRefs.current[idx] = el)}
                id={item.key}
                key={item.key}
                className={twMerge("m-0 relative ", overflowClassName, checkIsActive(item.key) ? activeClassName : "")}
                onClick={() => !isOverflowItem && handleOnClick(item)}
                onMouseEnter={() =>
                  mode === "horizontal" &&
                  !isOverflowItem &&
                  item.children &&
                  expandedKey !== item.key &&
                  setExpandedKey(item.key)
                }
                onMouseLeave={() => mode === "horizontal" && !isOverflowItem && setExpandedKey(undefined)}
              >
                <div className="flex justify-between ">
                  <div className="flex items-center gap-1">
                    {item.icon}
                    <div className="whitespace-nowrap">{item.label}</div>
                  </div>
                  {item.children && mode === "inline" && (
                    <AiFillCaretDown
                      className={twMerge(
                        "text-xs transition-transform duration-400",
                        expandedKey === item.key ? "rotate-180" : ""
                      )}
                    />
                  )}
                </div>
                {/* 서브메뉴 */}
                {item.children && expandedKey === item.key && (
                  <div className={subMenuClassName}>
                    {item.children?.map((child) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onClick?.(child);
                          setExpandedKey(undefined);
                        }}
                        key={child.key}
                        className={subMenuItemClassName}
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      {overflowMenuItems.length > 0 && mode === "horizontal" && (
        <OverflowMenu overflowItems={overflowMenuItems} onClick={onClick} overflowMenuPos={overflowMenuPos} />
      )}
    </>
  );
};

type OverflowMenuProps = {
  overflowItems: MenuItem[];
  onClick?: (item: MenuItem) => void;
  overflowMenuPos: [number, number];
};

const OverflowMenu = ({ overflowItems, onClick, overflowMenuPos }: OverflowMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedKey, setExpandedKey] = useState<string>(); // 서브메뉴
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  return (
    <div
      style={{
        position: "absolute",
        top: overflowMenuPos[0],
        left: overflowMenuPos[1],
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative">
        <button className="m-0 rounded-none btn btn-ghost text-color-main-500">
          <AiOutlineEllipsis />
        </button>
        {isOpen && (
          <div className="z-50 absolute bottom-0 translate-y-[100%] right-0  border-0 text-sm rounded-sm shadow-lg bg-white flex flex-col p-2">
            {overflowItems.map((item) => (
              <div
                key={item.key}
                onClick={() => onClick?.(item)}
                className="relative font-normal whitespace-nowrap btn btn-ghost btn-sm text-primary"
                onMouseEnter={() => item.children && expandedKey !== item.key && setExpandedKey(item.key)}
                onMouseLeave={() => setExpandedKey(undefined)}
              >
                {item.label}
                {item.children && expandedKey === item.key && (
                  <div className="absolute left-0 top-0 translate-x-[-100%] bg-white drop-shadow p-4">
                    {item.children?.map((child) => (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          onClick?.(child);
                          setExpandedKey(undefined);
                        }}
                        key={child.key}
                        className="block font-normal btn-sm text-primary h-fit"
                      >
                        {child.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
