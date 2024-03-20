import * as Job from ".";
import { DataListContainer } from "@shared/ui-web";
import { ModelsProps } from "@shared/util-client";
import { JobItem } from "./Job.Item";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";

export const JobList = ({ slice = st.slice.job, init }: ModelsProps<slice.JobSlice, gql.Job>) => {
  const router = useRouter();
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Job.Item}
      renderDashboard={Job.Stat}
      queryMap={gql.jobQueryMap}
      edit={
        // <DataEditModal slice={slice} renderTitle={(job: DefaultOf<gql.Job>) => `${job.field}`}>
        <Job.Edit slice={slice} />
        // </DataEditModal>
      }
      type="list"
      columns={["type", { key: "field", render: (field: string) => <span>{field}</span> }, "status", "createdAt"]}
      actions={(job: gql.LightJob, idx) => [
        "remove",
        "edit",
        {
          type: "approve",
          render: () => <Job.Action.Approve job={job} idx={idx} slice={slice} />,
        },
      ]}
    />
  );
};

const JobListInSelf = ({ jobList, slice = st.slice.job }: { jobList: gql.LightJob[]; slice: slice.JobSlice }) => {
  const router = useRouter();
  return (
    <>
      {jobList.map((job, index) => (
        <JobItem.InSelf onClick={() => router.push(`/job/${job.id}`)} key={index} job={job as gql.Job} slice={slice} />
      ))}
    </>
  );
};
JobList.InSelf = JobListInSelf;

const JobListInEmployer = ({ jobList, slice = st.slice.job }: { jobList: gql.LightJob[]; slice: slice.JobSlice }) => {
  const router = useRouter();
  return (
    <>
      <Job.Item.InNew url="/employer/job/new" />
      {jobList.map((job, index) => (
        <JobItem.InEmployer
          onClick={() => router.push(`/employer/job/${job.id}`)}
          key={index}
          job={job}
          slice={slice}
        />
      ))}
    </>
  );
};
JobList.InEmployer = JobListInEmployer;
