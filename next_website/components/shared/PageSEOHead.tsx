import Head from 'next/head';
interface PageSEOProps {
  title: string;
  description?: string;
  ogType: string;
  naverSiteVerification?: string
  siteUrl?: string
  twitterCardImgUrl?: string
  twitterImgUrl?: string
  ogImageUrl?: string
  keyword?: string
}

// 반드시 PageSEO 는 헤더로 감싸야 합니다. 헤더 태그 안에 두번 이상의 Fractgent 로 감싸게 되면 데이터가 잘 나오지 않습니다.
export default function PageSEOHead({ title, description, keyword, ogType, naverSiteVerification,
  siteUrl,
  twitterCardImgUrl, twitterImgUrl, ogImageUrl }: PageSEOProps) {

  return <Head>
    <title>{title}</title>
    <meta name='robots' content='follow, index' />
    <meta name='description' content={description} />
    <meta name='keyword' content={keyword} />
    <meta property='og:url' content={siteUrl} />
    <meta property='og:type' content={ogType} />
    <meta property='og:site_name' content={title} />
    <meta property='og:description' content={description} />
    <meta property='og:title' content={title} />

    {naverSiteVerification && <meta name="naver-site-verification" content={naverSiteVerification} />}
    <meta name="robots" content="INDEX, FOLLOW" /> <meta name="NaverBot" content="All" />
    <meta name="NaverBot" content="index,follow" /> <meta name="Yeti" content="All" />
    <meta name="Yeti" content="index,follow" /> <meta name="author" content="zand" />
    <link rel="canonical" href={siteUrl} />
    <meta name="twitter:card" content={twitterCardImgUrl || ogImageUrl || ''} />
    <meta name="twitter:image" content={twitterImgUrl || ogImageUrl || ''} />
    <meta name="twitter:title" content={title} />
    <meta
      name="twitter:description"
      content={description}
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={ogImageUrl} />
    <meta name="weibo:type" content="webpage" />
    <meta property="weibo:webpage:title" content={title} />
    <meta name="weibo:webpage:url" content={siteUrl} />
    <meta
      name="weibo:webpage:description"
      content={description}
    />
    <meta name="weibo:webpage:image" content={ogImageUrl} />
  </Head>
};
