import { AiOutlineComment, AiOutlineEye, AiOutlineKey, AiOutlineLike, AiOutlineWechat } from "react-icons/ai";
import { DataItem, RecentTime } from "@shared/ui-web";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Locale, gql, slice, st } from "@social/data-access";
import { ModelProps } from "@shared/util-client";
import { Utils, cnst } from "@shared/util";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

export const StoryItem = ({
  className,
  story,
  slice = st.slice.story,
  actions,
  columns,
}: ModelProps<slice.StorySlice, gql.LightStory>) => {
  return (
    <DataItem
      className={className}
      title={story.title}
      model={story}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};

const publicColumns = (l: (key: Locale, param?: any) => string) => [
  {
    title: <div className="flex justify-center h-8 pt-1.5">{l("story.title")}</div>,
    dataIndex: "title",
    render: (title: string, story: gql.LightStory, idx: number) => (
      <div>
        <div className={`flex items-center gap-2 cursor-pointer`}>
          {!!story.category && <span className=" rounded-sm text-xs px-2 py-[3px]">[{story.category}]</span>}
          {story.type === "admin" ? <HiOutlineSpeakerphone /> : <AiOutlineComment />}
          <div className="hidden md:block">{title}</div>
          <div className="md:hidden">{Utils.shorten(title, 20)}</div>
          <div className="text-color-main">({story.totalStat.comments})</div>
          {story.isNew() && (
            <div className="text-white text-[10px] bg-color-main rounded-md w-[1.5em] mt-0.5 text-center">N</div>
          )}
        </div>
        <div className="flex text-gray-400 md:hidden">
          <div className="mr-1">{Utils.shorten(story.user?.nickname ?? "", 10)}</div>
          <div className="mr-1">
            | <RecentTime date={story.createdAt} breakUnit="minute" />
          </div>
          <div className="mr-1">
            | <AiOutlineEye /> {story.totalStat.views}
          </div>
          <div className="mr-1">
            | <AiOutlineLike /> {story.totalStat.likes}
          </div>
        </div>
      </div>
    ),
  },
  {
    title: <div className="flex justify-center h-8 pt-1.5">{l("story.user")}</div>,
    dataIndex: "user",
    width: "15%",
    render: (user?: gql.shared.User) => <div className="flex justify-center">{user?.nickname}</div>,
    responsive: ["xl", "lg", "md"] as cnst.Responsive[],
  },
  {
    title: <div className="flex justify-center h-8 pt-1.5">{l("story.view")}</div>,
    dataIndex: "totalStat",
    width: "6%",
    render: ({ views }: gql.StoryStat) => <div className="flex justify-center">{views}</div>,
    responsive: ["xl", "lg", "md"] as cnst.Responsive[],
  },
  {
    title: <div className="flex justify-center h-8 pt-1.5">{l("story.like")}</div>,
    dataIndex: "totalStat",
    width: "6%",
    render: ({ likes }: gql.StoryStat) => <div className="flex justify-center">{likes}</div>,
    responsive: ["xl", "lg", "md"] as cnst.Responsive[],
  },
  {
    title: <div className="flex justify-center h-8 pt-1.5">{l("story.dislike")}</div>,
    dataIndex: "totalStat",
    width: "6%",
    render: ({ unlikes }: gql.StoryStat) => <div className="flex justify-center">{unlikes}</div>,
    responsive: ["xl", "lg", "md"] as cnst.Responsive[],
  },
  {
    title: <div className="flex justify-center h-8 pt-1.5">{l("story.createdAt")}</div>,
    dataIndex: "createdAt",
    width: "12%",
    render: (createdAt: Date) => (
      <div className="flex justify-center">{<RecentTime date={createdAt} breakUnit="minute" />}</div>
    ),
    responsive: ["xl", "lg", "md"] as cnst.Responsive[],
  },
];
StoryItem.publicColumns = publicColumns;

const privateColumns = (l: (key: Locale, param?: any) => string) => [
  {
    title: `${l("main.title")}`,
    dataIndex: "totalStat",
    render: ({ comments }: gql.StoryStat, { title }: gql.LightStory) => (
      <div className="flex items-center gap-2 cursor-pointer">
        <AiOutlineKey />
        {title} <b className="text-color-main">[{comments}]</b>
      </div>
    ),
  },
  {
    title: `${l("main.author")}`,
    dataIndex: "user",
    width: "12%",
    render: (user?: gql.shared.User) => <span>{Utils.replaceStart(user?.nickname ?? "")}</span>,
  },
  {
    title: `${l("story.view")}`,
    dataIndex: "totalStat",
    width: "4%",
    render: ({ views }: gql.StoryStat) => <span>{views}</span>,
  },
  {
    title: `${l("story.createdAt")}`,
    dataIndex: "createdAt",
    width: "12%",
    render: (createdAt: Date) => <span>{Utils.toIsoString(createdAt, true)}</span>,
  },
];
StoryItem.privateColumns = privateColumns;

const selfColumns = (l: (key: Locale, param?: any) => string) => [
  {
    title: l("story.title"),
    dataIndex: "title",
    key: "title",
  },
  {
    title: l("story.createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    width: "16%",
    render: (createdAt) => <RecentTime date={createdAt} />,
  },
];
StoryItem.selfColumns = selfColumns;

const abstractColumns = (l: (key: Locale, param?: any) => string, maxWidth: string | number = "50%") => [
  {
    title: l("story.title"),
    dataIndex: "title",
    key: "title",
    render: (title: string, story: gql.LightStory, idx: number) => (
      <div className="">
        <div className={`flex  items-center gap-2 cursor-pointer `}>
          {!!story.category && (
            <span className="border border-gray-400 rounded-sm text-xs px-2 py-[3px]">{story.category}</span>
          )}
          {story.type === "admin" ? <HiOutlineSpeakerphone /> : <AiOutlineComment />}
          <div className={`truncate max-w-[${typeof maxWidth === "string" ? maxWidth : `${maxWidth}px`}]`}>{title}</div>
          <div className="text-color-main">({story.totalStat.comments})</div>
          {story.isNew() && (
            <div className="text-white text-[10px] bg-color-main rounded-md w-[1.5em] mt-0.5 text-center">N</div>
          )}
        </div>
        <div className="flex text-gray-400 md:hidden">
          <div className="mr-1">{Utils.shorten(story.user?.nickname ?? "", 10)}</div>
          <div className="mr-1">
            | <RecentTime date={story.createdAt} breakUnit="minute" />
          </div>
          <div className="mr-1">
            | <AiOutlineEye /> {story.totalStat.views}
          </div>
          <div className="mr-1">
            | <AiOutlineLike /> {story.totalStat.likes}
          </div>
        </div>
      </div>
    ),
  },
  // {
  //   title: <div className="flex justify-center h-8 pt-1.5">{l("story.user")}</div>,
  //   dataIndex: "user",
  //   render: (user?: gql.shared.User) => <div className="flex justify-center w-12">{user?.nickname}</div>,
  //   responsive: ["xl", "lg", "md"] as cnst.Responsive[],
  // },
  {
    title: l("story.createdAt"),
    dataIndex: "createdAt",
    key: "createdAt",
    render: (date: Date) => <RecentTime className="w-max" date={date} breakUnit="minute" />,
  },
];
StoryItem.abstractColumns = abstractColumns;

const StoryItemAbstract = ({
  className,
  story,
  slice = st.slice.story,
  onClick,
}: ModelProps<slice.StorySlice, gql.LightStory>) => {
  return (
    <div
      className={twMerge(
        `flex justify-between py-8 border-gray-200 items-center cursor-pointer hover:bg-gray-100 duration-500 h-12 md:h-10 px-2`,
        className
      )}
      onClick={() => onClick?.(story)}
    >
      <div className="w-full ">
        <div className={`flex w-full justify-between items-center cursor-pointer hover:bg-gray-100 duration-300`}>
          <div className="flex items-center w-4/6 gap-1">
            {!!story.category && (
              <span className="border border-gray-400 rounded-sm text-xs px-2 py-[3px]">{story.category}</span>
            )}
            {story.type === "admin" ? <HiOutlineSpeakerphone /> : <AiOutlineComment />}
            <div className={`truncate py-1 max-w-[85%]`}>{story.title}</div>
            <div className="text-color-main">({story.totalStat.comments})</div>
            {story.isNew() && (
              <div className="text-white text-[8px] bg-color-main rounded-md w-[1.5em] h-[1.5em] mt-0.5 text-center">
                N
              </div>
            )}
          </div>
          <RecentTime className="text-sm text-black turncate" date={story.createdAt} breakUnit="minute" />
        </div>
        <div className="flex justify-between w-full text-gray-400 md:hidden">
          <div className="w-3/4 mr-1 truncate">{story.user?.nickname ?? ""}</div>
          <div className="flex gap-3 text-slate-800">
            <div className="mr-1">
              <AiOutlineEye /> {story.totalStat.views}
            </div>
            <div className="mr-1">
              <AiOutlineLike /> {story.totalStat.likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
StoryItem.Abstract = StoryItemAbstract;

const StoryItemGallery = ({
  className,
  story,
  slice = st.slice.story,
  actions,
  columns,
  idx,
  onClick,
}: ModelProps<slice.StorySlice, gql.LightStory>) => {
  return (
    <div
      key={idx}
      className="border border-[#ddd] cursor-pointer rounded-md overflow-hidden"
      onClick={() => onClick?.(story)}
    >
      {story.images[0]?.url ? (
        <div className="relative w-full h-[160px] md:h-[260px] ">
          <Image
            className="object-cover"
            src={story.images[0]?.url}
            width={320}
            height={260}
            alt="thumbnail"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        </div>
      ) : (
        <div className="w-full h-[160px] md:h-[260px] object-cover bg-gray-100"></div>
      )}
      <div className="p-4 text-center">
        <div className="px-2 mx-auto mb-2 text-xs bg-gray-100 border rounded-sm w-fit">{story.category}</div>
        <h3 className="text-lg">{story.title}</h3>
        <p className="text-xs">
          {story.user?.nickname} · {story.createdAt.format("MM-DD")} · {story.totalStat.views} views
        </p>
      </div>
    </div>
  );
};
StoryItem.Gallery = StoryItemGallery;

const StoryItemYoutube = ({
  className,
  story,
  slice = st.slice.story,
  actions,
  columns,
  onClick,
  idx,
}: ModelProps<slice.StorySlice, gql.LightStory>) => {
  return (
    <div
      key={idx}
      className={twMerge(
        `relative hover:scale-105 duration-300 cursor-pointer border border-[#ddd] rounded-md overflow-hidden`
      )}
      onClick={() => onClick?.(story)}
    >
      {story.thumbnails[0]?.url && (
        <div className="relative w-full h-[200px]">
          <Image
            className="object-cover w-full"
            src={story.thumbnails[0]?.url}
            width={377}
            height={200}
            alt="thumbnail"
            placeholder="blur"
            blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        </div>
      )}
      <div className="flex items-center gap-4 p-4 ">
        {story.logo?.url && (
          <div className="-mt-4">
            <Image
              className="w-[40px] rounded-full object-cover"
              src={story.logo?.url}
              width={40}
              height={40}
              alt="logo"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-sm mb-5 min-h-[40px] line-clamp-2">{story.title}</h3>
          <div className="absolute right-0 flex items-center justify-between w-full px-4 text-xs bottom-2">
            <div className="text-[14px] text-gray-400  gap-4 flex">
              <div className="flex gap-1">
                <AiOutlineEye className="" />
                {story.totalStat.views}
              </div>
              <div className="flex gap-1">
                <AiOutlineWechat className="" />
                {story.totalStat.comments}
              </div>
            </div>
            <div className="text-gray-400">
              <RecentTime date={story.createdAt} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
StoryItem.Youtube = StoryItemYoutube;
