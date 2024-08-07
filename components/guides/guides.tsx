"use client";
import { AggregatedGuide } from "@/utils/types/types";
import GuideCard from "@/components/guideCard/guideCard";
import {
  GuidesContainer,
  ModuleTitle,
  DropdownContainer,
  TopContainer,
  GradeContainer,
  CodeGrade,
  CodeGradeContainer,
  DesignGrade,
  DesignGradeContainer
} from "./styles";
import Dropdown from "@/components/dropDown/dropDown";
import { useState, useEffect } from "react";
import useLocalStorage from "@/utils/useLocalStorage";
import useUser from "@/utils/useUser";
import { useSearchParams } from "next/navigation";

type Props = {
  guides: AggregatedGuide[];
}

const Guides = ({guides}:Props) => {
  const options = [
    "MODULE 0",
    "MODULE 1",
    "MODULE 2",
    "MODULE 3",
    "MODULE 4",
    "MODULE 5",
    "MODULE 6",
    "MODULE 7",
  ];


  const { user } = useUser();
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  //SELECTION MODULE
  const moduleParam = searchParams.get("module");
  const [module, setModule] = useState<string>(moduleParam || "");
  const [moduleSelected, setModuleSelected] = useLocalStorage("Selected Module",{ selected: moduleParam || "MODULE 1" });

  //GRADES
  const [averageCodeGrade, setAverageCodeGrade] = useState(0);
  const [averageDesignGrade, setAverageDesignGrade] = useState(0);
  const [showGrade, setShowGrade] = useState(false);

  //Condition to check if the user is logged in or not, when the user is not logged in the grades disapear
  //if you user is logged in the grades reapear
  useEffect(() => {
    if (user) {
      setShowGrade(true);
    }
  }, [user]);

  const { selected } = moduleSelected;
  const option = (selected: string) => {
    setModuleSelected({ selected });
  };

  //Function that filters which guides should be displayed depending on a module and therefore which grades for the guides
  const filteredGuides = guides.filter((guide: AggregatedGuide) => {
    const isInModule = guide.module.title[0] === selected[selected.length - 1];
    if (!category) return isInModule;
    return isInModule && guide.category === category;
  });

  //Function that separates grades from guides into arrays and counts average
  const gradeStatus = () => {
    //Arrays holding seperated grades depending on which module you have selected
    let designGrades: number[] = [];

    let codingGrades: number[] = [];

    //getting grades from the guides and making conditions
    filteredGuides.forEach((guide) => {
      let grades: number[] = [];

      const hasReturns = guide.userReturns && guide.userReturns.length > 0;

      const hasReviews = guide.userReviews && guide.userReviews.length > 0;

      //Checking for undefined grades
      const checkUndefined = (grade: number | undefined): boolean => {
        if (grade !== undefined) {
          return true;
        } else {
          return false;
        }
      };

      //Filtering out undefined grades with "checkUndefined" function, and putting the grades that came from reviews into an array
      //If there are no grades or they are undefined the garde is 0
      if (hasReviews) {
        grades = guide.userReviews
          .map((review) => review.grade)
          .filter(checkUndefined) as number[];
        if (grades.length === 0) {
          grades = [0];
        }
      }

      //if the student has returned the guide but has not reviewed the grade is 5
      if (hasReturns && !hasReviews) {
        grades = [5];
      }

      //if the student hasn't returned grade is 0 since you can't review before returning
      if (!hasReturns) {
        grades = [0];
      }

      const averageGradeForThisGuide = grades.reduce((a, b) => a + b, 0) / grades.length;
      //Pushing the grades into designGrades and codingGrdes arrays depending on category
      if (guide.category === "design") {
        designGrades.push(averageGradeForThisGuide);
      }

      if (guide.category === "code") {
        codingGrades.push(averageGradeForThisGuide);
      }
    });

    //Calculating average of grades from designGrades and codingGrades arrays
    const gradeAverage = (codingGrades: number[], designGrades: number[]) => {
      let sumCode = 0;
      let sumDesign = 0;

      for (let i = 0; i < codingGrades.length; i++) {
        sumCode += codingGrades[i];
      }

      for (let i = 0; i < designGrades.length; i++) {
        sumDesign += designGrades[i];
      }

      //Putting the grades into state after calculating average and avoiding deviding by 0
      let averageCode =
        codingGrades.length > 0 ? sumCode / codingGrades.length : 0;
      setAverageCodeGrade(averageCode);

      let averageDesign =
        designGrades.length > 0 ? sumDesign / designGrades.length : 0;
      setAverageDesignGrade(averageDesign);
    };

    //Calling gradeAverage calculating function in useEffect so it renders only once for rendering optamization
    useEffect(() => {
      gradeAverage(codingGrades, designGrades);
    }, [codingGrades, designGrades]);
  };
  gradeStatus();

  console.log(showGrade)

  useEffect(() => {
    //if the module in the url canges and is different from the localStorage, change the selected module.
    moduleParam && setModuleSelected({ selected: moduleParam });
  }, [moduleParam]);
  return (
    <>
    <TopContainer>
      <DropdownContainer>
        <Dropdown options={options} selected={selected} setSelected={option} />
        <ModuleTitle>{module.substring(3)}</ModuleTitle>
      </DropdownContainer>
      <GradeContainer>
      {showGrade && (
        <>
          <CodeGradeContainer>
          code
          <CodeGrade>{averageCodeGrade.toFixed(1)}</CodeGrade>
          </CodeGradeContainer>
          <DesignGradeContainer>
          Design
          <DesignGrade>{averageDesignGrade.toFixed(1)}</DesignGrade>
          </DesignGradeContainer>
        </>
      )}
      </GradeContainer>
      </TopContainer>
      <GuidesContainer>
        {filteredGuides.map((guide: AggregatedGuide, nr: number) => {
          if (guide.module.title != module) setModule(guide.module.title);
          return <GuideCard key={guide._id.toString()} guide={guide} nr={nr} />;
        })}
      </GuidesContainer>
    </>
  );
};

export default Guides;
