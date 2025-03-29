import Link from "next/link";
import { client } from "@/config/contentful";

export const metadata = {
  description: "High-performance e-commerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

const fetchProduct = async () => {
  const products = await client.getEntries({ 'content_type': 'main' });
  return products.items;
};

const fetchProductBottom = async () => {
  const products = await client.getEntries({ 'content_type': 'bottomMain' });
  return products.items;
};

const fetchProductEnd = async () => {
  const products = await client.getEntries({ 'content_type': 'mainEnd' });
  return products.items;
};

export default async function Home() {


  const data = await fetchProduct();
  const dataBottom = await fetchProductBottom();
  const dataEnd = await fetchProductEnd();
 


  // Prepare collection items with proper image URLs
  const getCollections = (bottomImages: any[]) => {
    return bottomImages.map((asset: any) => ({
      id: asset.sys.id,
      title: asset.fields.title,
      imageUrl: `https:${asset.fields.file.url}`,
      href: `/search/${asset.fields.title.toLowerCase().replace('-collection', '')}`
    }));
  };

  return (
    <main className="flex-1 bg-slate-200">
      
      <section className="w-full pt-12 md:pt-24 lg:pt-32 bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-8 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16 items-center">
            <div className="space-y-6">
              {data?.map((product: any) => (
                <div key={product?.sys.id}>
                  <h1 className="lg:leading-tighter text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-[3.5rem] 2xl:text-[4rem]">
                    {product?.fields.title?.split(" ").slice(0, -1).join(" ")}{" "}
                    <span className="text-primary">
                      {product?.fields.title?.split(" ").slice(-1)}
                    </span>
                  </h1>
                  <p className="text-lg text-muted-foreground md:text-xl">
                    {product?.fields.titleBottomText}
                  </p>
                </div>
              ))}

              <div className="flex flex-wrap gap-4">
                {data?.map((product: any) => (
                  <div key={product?.sys.id}>
                    {product?.fields?.buttonLeft && (
                      <Link
                        href={product.fields.buttonLeft.link || "#"}
                        className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        prefetch={false}
                      >
                        {product.fields.buttonLeft.text}
                      </Link>
                    )}
                    {product?.fields?.buttonRight && (
                      <Link
                        href={product.fields.buttonRight.link || "#"}
                        className="inline-flex h-11 items-center justify-center rounded-full border-2 border-primary bg-transparent px-6 text-sm font-medium text-primary shadow-lg transition-all hover:bg-primary/10 hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        prefetch={false}
                      >
                        {product.fields.buttonRight.text}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-square overflow-hidden rounded-2xl shadow-xl">
              {data?.map((product: any) => (
                <img
                  key={product?.sys.id}
                  src={`https:${product?.fields.imageUrl?.fields?.file?.url}`}
                  alt={product?.fields.title || "Fashion Hero"}
                  className="h-full w-full object-cover object-center"
                  height={1200}
                  width={1200}
                />
              ))}
            </div>
          </div>
         
        </div>
      </section>

    
      {dataBottom?.map((item: any) => {
        const collections = getCollections(item.fields.bottomImages);
        
        return (
          <section key={item.sys.id} className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6 space-y-12">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                  {item.fields.miniHeading}
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  {item.fields.bottomHeading}
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
                  {item.fields.headingBottom}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {collections.map((collection: any) => (
                  <div key={collection.id} className="group relative overflow-hidden rounded-xl">
                    <Link href={collection.href} prefetch={false}>
                      <div className="aspect-[3/4] overflow-hidden">
                        <img
                          src={collection.imageUrl}
                          alt={collection.title}
                          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                          width={600}
                          height={800}
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <h3 className="text-xl font-bold text-white">
                          {collection.title.replace('-collection', '').replace(/-/g, ' ')}
                        </h3>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors capitalize">
                          {collection.title.replace('-collection', '').replace(/-/g, ' ')}
                        </h3>
                        <button className="mt-2 text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                          Shop now
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </button>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      
      {dataEnd.map((item: any, index: number) => (
  <section key={index} className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 -z-10" />
    <div className="container px-4 md:px-6 flex flex-col items-center text-center gap-8">
      <div className="space-y-4">
        <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
          {item.fields.titleTop}
        </div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          {item.fields.titleMain}
        </h2>
        <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
          {item.fields.titleEnd}
        </p>
      </div>
      <Link
        href="/search/sales"
        className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        prefetch={false}
      >
        {item.fields.buttonEnd}
      </Link>
    </div>
  </section>
))}

    </main>
  );
}
