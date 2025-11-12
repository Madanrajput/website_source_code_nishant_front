import MainLayout from "../layouts/MainLayout";
import WallpaperCard from "../components/WallpaperCard";
const SustainableFurniture = () => {
  return (
    <div>
      <head>
        <title>
        Sustainable furniture for your home - High Creation Interior	
        </title>
        <meta
          name="description"
          content="Elevate your home with High Creation Interior's sustainable furniture, combining eco-friendly materials and timeless designs for a greener, stylish living space.	"
        />

<link rel="canonical" href="https://hcinterior.in/sustainable-furniture" />	
      </head>
      <MainLayout>
        <main>
          <section className="container my-5 rattan_wrapper">
            <div className="text-center mb-5">
              <h1 className="wallpaperHeading">Sustainable Furniture</h1>
              <p className="px-lg-5 team_description">
                Elevate your home with High Creation Interior&apos;s sustainable
                furniture, crafted from eco-friendly materials and designed for
                lasting beauty. Our pieces blend timeless style with
                environmental responsibility, making it easy to create a
                greener, more stylish living space. From elegant tables to
                functional storage solutions, each item is thoughtfully designed
                to reduce waste while enhancing your home. Whether you’re
                refreshing a room or furnishing your entire home, our furniture
                offers the perfect balance of sustainability and sophistication.
                Make a positive impact on the planet without compromising on
                style, and enjoy a space that’s as kind to the earth as it is to
                you.
              </p>
            </div>
            <div className="row g-4 mx-0">
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="/rattan"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/sustainable-furniture/rattan.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="bed"
                  portfolioTitle="Rattan"
                  wallpaperDescriptiion="Rattan offers a blend of timeless style and natural warmth, perfect for enhancing any space with its unique, sustainable charm"
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View More"
                  btnHrefWallpaper="/rattan"
                />
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <WallpaperCard
                  linkTagWallpaper="reclaimed-wood"
                  wallpaperCard="wallpapercard"
                  imgWallpaper="/images/sustainable-furniture/reclaimed-wood.jpg"
                  wallpaperImgClass="wallpaperclass"
                  altWallpaper="Kidsbed"
                  portfolioTitle="Reclaimed Wood"
                  wallpaperDescriptiion="Bring warmth and character to your space with reclaimed wood, offering a unique, sustainable touch to any design."
                  descriptionClass="team_description mb-0"
                  textBtnWallpaper="View More"
                  btnHrefWallpaper="reclaimed-wood"
                />
              </div>
            </div>
          </section>
          <hr />
        </main>
      </MainLayout>
    </div>
  );
};

export default SustainableFurniture;
