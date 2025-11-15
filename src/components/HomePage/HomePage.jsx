import CommunityRecipeList from "../CommunityRecipes/CommunityRecipeList";
import HomeHeader from "./HomeHeader";
import TrendingRecipeList from "./TrendingRecipeList";

function HomePage() {
  return (
    <>
      <HomeHeader />
      <TrendingRecipeList />
      {/* <CommunityRecipeList /> */}
    </>
  );
}

export default HomePage;
