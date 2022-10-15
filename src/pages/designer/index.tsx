import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import DesignerTemplate from "@modules/designer/templates"
import { useRouter } from "next/router"
import { ReactElement } from "react"
import { NextPageWithLayout, PrefetchedPageProps } from "types/global"

const ProductPage: NextPageWithLayout<PrefetchedPageProps> = () => {
  const { query, isFallback, replace } = useRouter()
  return (
    <>
      <Head
        description={'Suunnittele oma pelitietokone helpon työkalumme avulla!'}
        title={'Suunnittele oma pelitietokone'}
      />
      <DesignerTemplate />
    </>
  )
}

ProductPage.getLayout = (page: ReactElement) => {
  return <Layout dark={true}>{page}</Layout>
}

export default ProductPage
