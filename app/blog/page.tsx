"use client";

import { ModuleTitle, TopContainer } from "@/components/guides/styles";
import { MainContent } from "@/components/mainLayout";
import { Title } from "@/components/sidebar/sidebar.style";
import { MainContainer } from "@/styles/pageStyles/review.styles";

const Blog = () => {
  return (
    <>
      <MainContent>
        <TopContainer>
          <ModuleTitle>
            <h1>Blog</h1>
          </ModuleTitle>
        </TopContainer>
        <Title>
          <h1>title</h1>
        </Title>
      </MainContent>
    </>
  );
};

export default Blog;
