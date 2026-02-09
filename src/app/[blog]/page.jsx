import MainLayout from "../layouts/MainLayout";
import api from "@/utils/api";
import { defaultAltText } from "@/utils/helper";
import { notFound } from "next/navigation";

/**
 * 🔒 Slug Guard
 * Blocks bots, invalid URLs, and legacy junk
 */
const isValidSlug = (slug) => {
  if (!slug) return false;
  if (slug === "undefined" || slug === "null") return false;
  if (slug.includes(".")) return false; // blocks .env, .git, etc
  return true;
};

const BASE_URL = "https://hcinterior.in";

/**
 * ✅ SERVER-SIDE METADATA (SEO + GSC SAFE)
 */
export async function generateMetadata({ params }) {
  const slug = params.blog;

  // 🚫 Invalid slug → no index, no API call
  if (!isValidSlug(slug)) {
    return {
      title: "Not Found",
      robots: "noindex, follow",
    };
  }

  try {
    const response = await api.get(`/cms-blog/blog-slug/${slug}`);
    const blogDetails = response.data;

    if (!blogDetails) {
      return {
        title: "Blog Not Found",
        robots: "noindex, follow",
      };
    }

    return {
      title:
        blogDetails?.seo_content?.meta_title ??
        blogDetails?.title ??
        "High Creation Interior Blog",

      description:
        blogDetails?.seo_content?.meta_description ?? "",

      keywords:
        blogDetails?.seo_content?.meta_keywords ?? "",

      alternates: {
        canonical: `${BASE_URL}/blog/${slug}`,
      },

      robots: "index, follow",
    };
  } catch (error) {
    return {
      title: "High Creation Interior",
      robots: "noindex, follow",
    };
  }
}

/**
 * ✅ BLOG PAGE (SERVER COMPONENT)
 */
const BlogDetail = async ({ params }) => {
  const slug = params.blog;

  // 🚫 Invalid slug → hard 404
  if (!isValidSlug(slug)) {
    notFound();
  }

  let blogDetails;

  try {
    const response = await api.get(`/cms-blog/blog-slug/${slug}`);
    blogDetails = response.data;
  } catch (error) {
    console.error("Blog fetch error:", error);
    notFound();
  }

  if (!blogDetails) {
    notFound();
  }

  return (
    <MainLayout>
      {/* ✅ Controlled JSON-LD injection */}
      {blogDetails?.seo_content?.custom_code && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: blogDetails.seo_content.custom_code,
          }}
        />
      )}

      <main>
        <div className="blog_detail">
          <div className="container">
            <div className="row my-5 justify-content-center mx-0">
              <div className="col-lg-10">
                <h1 className="pb-3">{blogDetails.title}</h1>

                {blogDetails.image && (
                  <img
                    src={blogDetails.image}
                    className="w-100 object-fit-cover"
                    alt={blogDetails.title ?? defaultAltText}
                  />
                )}

                <div className="details py-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blogDetails.description,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
      </main>
    </MainLayout>
  );
};

export default BlogDetail;
