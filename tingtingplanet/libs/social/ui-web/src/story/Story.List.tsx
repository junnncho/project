import { AiOutlineComment, AiOutlineDislike, AiOutlineEye, AiOutlineLike } from "react-icons/ai";
import { Comment, Story } from "..";
import { DataEditModal, DataListContainer, DataViewModal, Input, Pagination, Table } from "@shared/ui-web";
import { Dayjs } from "dayjs";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { ReactNode, useEffect } from "react";
import { cnst } from "@shared/util";
import { gql, slice, st, usePage } from "@social/data-access";
import { useRouter } from "next/navigation";

export const StoryList = ({ slice = st.slice.story, init }: ModelsProps<slice.StorySlice, gql.Story>) => {
  const boardList = st.use.boardList();
  useEffect(() => {
    st.do.initBoard();
  }, []);
  return (
    <DataListContainer
      init={init}
      slice={slice}
      type="list"
      view={({ story }: { story: gql.Story }) => (
        <DataViewModal slice={slice} renderTitle={(story: gql.Story) => `Story - ${story.title}`}>
          <Story.View story={story} slice={slice} />
          <Comment.List init={{ query: { root: story.id } }} />
        </DataViewModal>
      )}
      edit={
        <DataEditModal slice={slice} renderTitle={(story: DefaultOf<gql.Story>) => `${story.title}`}>
          <Story.Edit slice={slice} />
        </DataEditModal>
      }
      queryMap={gql.storyQueryMap}
      filterOptions={
        boardList === "loading"
          ? []
          : boardList.map((board) => ({
              key: board.name,
              query: { root: board.id },
            }))
      }
      renderItem={Story.Item}
      renderDashboard={Story.Stat}
      columns={[
        "title",
        {
          key: "totalStat",
          render: (totalStat: gql.StoryStat) => (
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1">
                <AiOutlineEye /> {totalStat.views}
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineLike /> {totalStat.likes}
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineDislike /> {totalStat.unlikes}
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineComment /> {totalStat.comments}
              </span>
            </div>
          ),
        },
        "rootType",
        {
          key: "user",
          render: (user: gql.shared.LightUser) => <div key={user.id}>{user.nickname}</div>,
        },
        {
          key: "createdAt",
          render: (createdAt: Dayjs) => createdAt.format("YYYY-MM-DD HH:mm:ss"),
        },
        "status",
      ]}
      actions={(story: gql.Story, idx: number) => [
        "edit",
        "remove",
        "view",
        ...(story.status === "active"
          ? [
              {
                type: "approve",
                render: () => <Story.Action.Approve slice={slice} idx={idx} story={story} />,
              },
              {
                type: "deny",
                render: () => <Story.Action.Deny slice={slice} idx={idx} story={story} />,
              },
            ]
          : story.status === "approved"
          ? [
              {
                type: "deny",
                render: () => <Story.Action.Deny slice={slice} idx={idx} story={story} />,
              },
            ]
          : story.status === "denied"
          ? [
              {
                type: "approve",
                render: () => <Story.Action.Approve slice={slice} idx={idx} story={story} />,
              },
            ]
          : []),
      ]}
    />
  );
};

interface StoryListInSelfProps {
  slice?: slice.StorySlice;
  self: gql.shared.User;
  rowClassName?: (story: gql.LightStory, idx: number) => string;
}
const StoryListInSelf = ({
  slice = st.slice.story,
  self,
  rowClassName = (story, idx) => `h-12 cursor-pointer ${idx % 2 ? "bg-gray-50" : ""}`,
}: StoryListInSelfProps) => {
  const { l } = usePage();
  const router = useRouter();
  const storyList = slice.use.storyList();
  useEffect(() => {
    if (!self.id) return;
    slice.do.initStory({ query: { user: self.id as string } });
  }, [self]);
  return (
    <Table
      dataSource={storyList === "loading" ? [] : storyList}
      columns={Story.Item.selfColumns(l)}
      loading={storyList === "loading"}
      // pagination={{ position: ["bottomCenter"] }}
      size="small"
      onRow={(story, idx) => ({
        onClick: () => router.push(`/${story.rootType}/${story.root}/story/${story.id}`),
      })}
      rowClassName={rowClassName}
    />
  );
};
StoryList.InSelf = StoryListInSelf;

interface StoryListInRootProps {
  root: string;
  rootType: string;
  viewStyle?: cnst.BoardViewStyle;
  secret?: boolean;
  banner?: ReactNode;
  rowClassName?: (story: gql.LightStory, idx: number) => string;
  self?: gql.shared.User;
}
const StoryListInRoot = ({
  init,
  slice = st.slice.story,
  root,
  rootType,
  viewStyle = "list",
  secret,
  banner,
  rowClassName = (story, idx) => `h-12 ${idx % 2 ? "bg-gray-50" : ""}`,
  self,
}: ModelsProps<slice.StorySlice, gql.Story> & StoryListInRootProps) => {
  const { l } = usePage();
  const router = useRouter();
  const storyList = slice.use.storyList();
  const storyCount = slice.use.storyCount();
  const pageOfStory = slice.use.pageOfStory();
  const limitOfStory = slice.use.limitOfStory();
  const innerWidth = st.use.innerWidth();
  const handleClickStory = (story: gql.LightStory) =>
    story.isViewable(self)
      ? router.push(`/${rootType}/${root}/story/${story.id}/?page=${pageOfStory}`)
      : window.alert(`${l("main.privateErr")}`);
  useEffect(() => {
    slice.do.initStory({
      ...init,
      query: { root, ...(secret ? { user: self?.id } : {}) },
    });
  }, []);
  // console.log(l(""));
  return (
    <>
      {viewStyle === "list" ? (
        <Table
          dataSource={storyList === "loading" ? [] : storyList.map((story) => Object.assign(story, { key: story.id }))}
          columns={secret ? Story.Item.privateColumns(l) : Story.Item.publicColumns(l)}
          pagination={false}
          loading={storyList === "loading"}
          size="small"
          showHeader={innerWidth >= 768}
          onRow={(story, idx) => ({ onClick: () => handleClickStory(story) })}
          rowClassName={rowClassName}
        />
      ) : viewStyle === "gallery" ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {banner}
          {storyList === "loading" ? (
            <Story.Loading.Gallery limit={limitOfStory} />
          ) : (
            storyList.map((story, idx) => (
              <Story.Item.Gallery key={story.id} story={story} idx={idx} onClick={handleClickStory} />
            ))
          )}
        </div>
      ) : viewStyle === "youtube" ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {banner}
          {storyList === "loading" ? (
            <Story.Loading.Youtube limit={limitOfStory} />
          ) : (
            storyList.map((story, idx) => (
              <Story.Item.Youtube key={story.id} story={story} idx={idx} onClick={handleClickStory} />
            ))
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="flex justify-center w-full mt-6 mb-10">
        <Pagination
          currentPage={pageOfStory}
          total={storyCount}
          onPageSelect={(page) => {
            slice.do.setPageOfStory(page);
          }}
          itemsPerPage={limitOfStory}
        />
      </div>
      <div className="flex justify-center">
        <Input.Search
          className="text-sm duration-300 placeholder:text-gray-300 w-60 focus:border-color-main md:text-base"
          placeholder={l("main.placeHolderSearch")}
          onSearch={(search) =>
            slice.do.setQueryOfStory({
              root,
              ...(search.length ? { $text: { $search: search } } : {}),
            })
          }
          enterButton
        />
      </div>
    </>
  );
};
StoryList.InRoot = StoryListInRoot;
interface StoryListInCustomProps {
  root: string;
  rootType: string;
  viewStyle?: cnst.BoardViewStyle;
  secret?: boolean;
  banner?: ReactNode;
  storyListRender: (story: gql.LightStory[]) => ReactNode;
  footRender?: (slice: slice.StorySlice) => ReactNode;
  rowClassName?: (story: gql.LightStory, idx: number) => string;
  self?: gql.shared.User;
}
const StoryListInCustom = ({
  init,
  slice = st.slice.story,
  root,
  rootType,
  viewStyle = "list",
  secret,
  banner,
  rowClassName = (story, idx) => `h-12 ${idx % 2 ? "bg-gray-50" : ""}`,
  self,
  storyListRender,
  footRender,
}: ModelsProps<slice.StorySlice, gql.Story> & StoryListInCustomProps) => {
  const { l } = usePage();
  const router = useRouter();
  const storyList = slice.use.storyList();
  const storyCount = slice.use.storyCount();
  const pageOfStory = slice.use.pageOfStory();
  const limitOfStory = slice.use.limitOfStory();
  const handleClickStory = (story: gql.LightStory) =>
    story.isViewable(self)
      ? router.push(`/${rootType}/${root}/story/${story.id}/?page=${pageOfStory}`)
      : window.alert(`${l("main.privateErr")}`);
  useEffect(() => {
    slice.do.initStory({
      ...init,
      query: { root, ...(secret ? { user: self?.id } : {}) },
    });
  }, []);
  return (
    <>
      {viewStyle === "list" ? (
        <div>
          {storyList === "loading" ? <Story.Loading.Gallery limit={limitOfStory} /> : storyListRender(storyList)}
        </div>
      ) : viewStyle === "gallery" ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {banner}
          {storyList === "loading" ? (
            <Story.Loading.Gallery limit={limitOfStory} />
          ) : (
            storyList.map((story, idx) => <Story.Item.Gallery story={story} idx={idx} onClick={handleClickStory} />)
          )}
        </div>
      ) : viewStyle === "youtube" ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {banner}
          {storyList === "loading" ? (
            <Story.Loading.Youtube limit={limitOfStory} />
          ) : (
            storyList.map((story, idx) => <Story.Item.Youtube story={story} idx={idx} onClick={handleClickStory} />)
          )}
        </div>
      ) : (
        <></>
      )}
      {footRender && footRender(slice)}
      <div className="flex justify-center w-full mt-6 mb-10">
        <Pagination
          currentPage={pageOfStory}
          total={storyCount}
          onPageSelect={(page) => {
            slice.do.setPageOfStory(page);
          }}
          itemsPerPage={limitOfStory}
        />
      </div>
      <div className="flex justify-center mb-5">
        <Input.Search
          className="w-60"
          placeholder={l("main.placeHolderSearch")}
          onSearch={(search) =>
            slice.do.setQueryOfStory({
              root,
              ...(search.length ? { $text: { $search: search } } : {}),
            })
          }
          enterButton
        />
      </div>
    </>
  );
};
StoryList.InCustom = StoryListInCustom;

interface StoryListAbstractProps {
  maxWidth?: string | number;
}
const StoryListAbstract = ({
  slice = st.slice.story,
  init,
}: ModelsProps<slice.StorySlice, gql.Story> & StoryListAbstractProps) => {
  const { l } = usePage();
  const router = useRouter();
  const storyList = slice.use.storyList();
  useEffect(() => {
    slice.do.initStory(init);
  }, []);
  return (
    <div>
      {storyList === "loading" ? (
        <Story.Loading />
      ) : (
        storyList.map((story, idx) => (
          <Story.Item.Abstract
            className={`${idx + 1 < storyList.length && "border-b"}`}
            key={idx}
            idx={idx}
            story={story}
            onClick={() => router.push(`/${story.rootType}/${story.root}/story/${story.id}`)}
          />
        ))
      )}
    </div>
  );
};
StoryList.Abstract = StoryListAbstract;
