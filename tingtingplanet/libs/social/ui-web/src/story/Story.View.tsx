import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineLeft,
  AiOutlineMore,
  AiOutlineWarning,
} from "react-icons/ai";
import { Dropdown, RecentTime } from "@shared/ui-web";
import { Modal } from "antd";
import { Story } from "..";
import { gql, slice, st, usePage } from "@social/data-access";
import { useRouter, useSearchParams } from "next/navigation";

interface StoryViewProps {
  className?: string;
  story: gql.Story;
  slice: slice.StorySlice;
  self?: gql.shared.User;
  back?: boolean;
}
// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const StoryView = ({ className, story, slice, self, back }: StoryViewProps) => {
  const page = useSearchParams().get("page");
  const router = useRouter();
  const { l } = usePage();
  return (
    <div className={className}>
      <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
        <h3>
          {back && <AiOutlineLeft onClick={() => router.back()} className="mr-2" />}
          {story.title}
        </h3>
        <div className="flex">
          <Dropdown
            className="mb-10"
            value={<AiOutlineMore />}
            buttonClassName="btn btn-outline"
            content={
              story.isMe(self) ? (
                <div className="flex flex-col gap-1">
                  <button
                    className="flex gap-1 flex-nowrap btn btn-sm btn-ghost"
                    onClick={() => st.do.goto(`/${story.rootType}/${story.root}/story/${story.id}/edit`)}
                  >
                    <AiOutlineEdit />
                    {l("main.edit")}
                  </button>
                  <button
                    className="flex gap-1 text-red-500 btn btn-sm btn-ghost flex-nowrap"
                    onClick={() =>
                      Modal.confirm({
                        icon: <AiOutlineDelete />,
                        content: `${l("main.removeMsg")}`,
                        onOk: () => {
                          slice.do.removeStory(story.id);
                          page ? router.push(`/${story.rootType}/${story.root}?page=${page}`) : router.back();
                        },
                      })
                    }
                  >
                    <AiOutlineDelete />
                    {l("main.remove")}
                  </button>
                </div>
              ) : (
                <button
                  className="flex gap-1 text-red-500 btn btn-sm btn-ghost flex-nowrap"
                  onClick={() => window.alert("신고되었습니다.")}
                >
                  <AiOutlineWarning className="mr-1" />
                  {l("main.report")}
                </button>
              )
            }
          />
        </div>
      </div>
      <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
        <div>{story.user?.nickname}</div>
        <div className="flex">
          <div className="mr-6">
            <AiOutlineEye className="mr-1" />
            {story?.totalStat?.views}
          </div>{" "}
          <RecentTime
            date={story.createdAt}
            breakUnit="second"
            timeOption={{ dateStyle: "short", timeStyle: "short" }}
          />
        </div>
      </div>
      <div className="p-6 border border-gray-200 view-story" dangerouslySetInnerHTML={{ __html: story.content }}></div>
      <div className="flex justify-center mt-3">
        <Story.Action.Like story={story} slice={slice} />
      </div>
    </div>
  );
};
