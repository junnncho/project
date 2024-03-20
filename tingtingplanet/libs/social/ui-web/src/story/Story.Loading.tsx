import { Skeleton } from "@shared/ui-web";
import { usePage } from "@social/data-access";

interface StoryLoadingProps {
  className?: string;
}
export const StoryLoading = ({ className }: StoryLoadingProps) => {
  const { l } = usePage();
  return (
    <div className={className}>
      <Skeleton active />
    </div>
  );
};

interface StoryLoadingGalleryProps {
  className?: string;
  limit?: number;
}

const StoryLoadingGallery = ({ className, limit = 20 }: StoryLoadingGalleryProps) => {
  return (
    <>
      {new Array(limit).fill(0).map((_, index) => (
        <div key={index} className={`block h-[406px] w-full overflow-hidden rounded-md relative`}>
          <Skeleton.Button active className="w-full" style={{ height: "406px" }} />
        </div>
      ))}
    </>
  );
};
StoryLoading.Gallery = StoryLoadingGallery;

interface StoryLoadingYoutubeProps {
  className?: string;
  limit?: number;
}

const StoryLoadingYoutube = ({ className, limit = 20 }: StoryLoadingYoutubeProps) => {
  return (
    <>
      {new Array(limit).fill(0).map((_, index) => (
        <div key={index} className="block h-[348px] w-full overflow-hidden rounded-md relative">
          <Skeleton.Button active className="w-full" style={{ height: "348px" }} />
        </div>
      ))}
    </>
  );
};
StoryLoading.Youtube = StoryLoadingYoutube;
