"use client";

import { buttonStyles } from "@/components/commonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons/faChevronLeft";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import type { Work as WorkData } from "@/lib/works";
import Loading from "@/app/loading";
import { notFound } from "next/navigation";

export default function Work({ params }: { params: { workId: string } }) {
  const { workId } = params;
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [work, setWork] = useState<WorkData>();

  useEffect(() => {
    const fetchWorkData = async () => {
      const res = await fetch(`/api/experience/${workId}`);
      if (res.status !== 200) {
        console.log("Finished");
        setIsLoading(false);
        setHasError(true);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setWork(data.data.work);
      } else {
        setHasError(true);
      }
      setIsLoading(false);
    };
    fetchWorkData();
  }, [workId]);

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (hasError) {
    return notFound();
  }

  return (
    <main className="overflow-auto max-h-content">
      <div className="bg-white mt-8 mb-8 md:mx-20 mx-8 px-4 py-4 rounded-lg border-2 border-stone-700 flex items-center flex-col md:flex-row gap-6">
        <Button
          className={`${buttonStyles}  self-start`}
          onClick={() => {
            window.history.back();
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
        </Button>
        <div className="prose md:mt-2">
          <p className="text-xl font-bold">Coming soon!</p>
          {/* <h1>{work!.title}</h1>
          <p>{work!.description}</p>
          <p>{work!.role.type}</p>
          <p>{work!.role.name}</p>
          <p>{work!.role.length}</p>
          <p>{work!.role.jobType}</p>
          <p>{work!.stack}</p> */}
        </div>
      </div>
    </main>
  );
}
