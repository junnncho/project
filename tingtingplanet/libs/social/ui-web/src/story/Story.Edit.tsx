import { Editor, Field, Input, Select } from "@shared/ui-web";
import { cnst } from "@shared/util";
import { gql, slice, st, usePage } from "@social/data-access";

interface StoryEditProps {
  type?: cnst.BoardViewStyle;
  slice?: slice.StorySlice;
  categories?: string[];
  storyId?: string;
  self?: gql.shared.User;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const StoryEdit = ({ type, slice = st.slice.story, categories = [], self }: StoryEditProps) => {
  const storyForm = slice.use.storyForm();
  const { l } = usePage();
  return (
    <>
      {self?.roles.includes("admin") && (
        <div className="flex items-center">
          <p className="w-20 mt-3">{l("story.type")} </p>
          <Select value={storyForm.type} style={{ width: "100%" }} onChange={slice.do.setTypeOnStory}>
            {["user", "admin"].map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </div>
      )}
      {categories.length ? (
        <div className="flex items-center">
          <p className="w-20 mt-3">{l("story.category")} </p>
          <Select value={storyForm.category} style={{ width: "100%" }} onChange={slice.do.setCategoryOnStory}>
            {categories.map((category) => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </div>
      ) : null}
      {type === "youtube" ? (
        <div className="flex items-center gap-4">
          <p className="w-20">{l("story.logo")}</p>
          <Field.Img
            file={storyForm.logo}
            addFiles={slice.do.uploadLogoOnStory}
            onRemove={() => slice.do.setLogoOnStory(null)}
            label=""
          />
          <p className="w-20">{l("story.thumbnails")} </p>
          <Field.Imgs
            label=""
            files={storyForm.thumbnails}
            addFiles={slice.do.uploadThumbnailsOnStory}
            onUpdate={slice.do.setThumbnailsOnStory}
          />
        </div>
      ) : null}
      <div className="flex items-center w-full mb-4">
        <p className="w-20 mt-3">{l("story.title")} </p>
        <Input
          className="w-full"
          inputClassName="w-full"
          value={storyForm.title}
          onChange={(e) => slice.do.setTitleOnStory(e.target.value)}
        />
      </div>
      <Editor
        addFile={slice.do.addImagesOnStory}
        addFilesGql={gql.addStoryFiles}
        onChange={slice.do.setContentOnStory}
        defaultValue={storyForm.id && storyForm.content}
      />
    </>
  );
};
