import { useIntersection } from "@lib/hooks/use-in-view"
import { Product } from "@medusajs/medusa"
import ProductTabs from "@modules/designer/components/product-tabs"
import React, { useRef, useState } from "react"
import { ProductPreviewType } from "types/global"
import ComponentSelect from "../components/component-select"
import ComponentMultiSelect from "../components/component-select-multiple"
import ImageGallery from "../components/image-gallary"
import Overview from "../components/overview"

export type DesignerItem = (ProductPreviewType & {
  calculated_price: number;
  product: Product;
});

const DesignerTemplate: React.FC = ({ }) => {
  const info = useRef<HTMLDivElement>(null)

  const [selected, setSelected] = useState<{
    case: DesignerItem | undefined,
    processor: DesignerItem | undefined
    gpu: DesignerItem | undefined
    mobo: DesignerItem | undefined
    ram: DesignerItem | undefined
    ssd: DesignerItem | undefined
    extra_ssd: DesignerItem | undefined
    cooler: DesignerItem | undefined
    extra_fans: DesignerItem | undefined
    cable: DesignerItem | undefined
    psu: DesignerItem | undefined
    os: DesignerItem | undefined
    services: DesignerItem[] | undefined
  }>({
    case: undefined,
    processor: undefined,
    gpu: undefined,
    mobo: undefined,
    ram: undefined,
    ssd: undefined,
    extra_ssd: undefined,
    cooler: undefined,
    extra_fans: undefined,
    cable: undefined,
    psu: undefined,
    os: undefined,
    services: undefined
  })
  
  return (
    <>
      <div className="content-designer pb-6 pt-40 relative">
        <ComponentSelect
          title="Case"
          component="case"
          infoTitle="What is a case?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            case: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Processor"
          component="processor"
          infoTitle="Mikä on suoritin?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            processor: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Graphics card"
          component="gpu"
          infoTitle="Mikä on näytönohjain?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            gpu: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Motherboard"
          component="mobo"
          infoTitle="Mikä on suoritin?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            mobo: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="RAM"
          component="ram"
          infoTitle="Mikä on suoritin?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            ram: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Disk space"
          component="ssd"
          infoTitle="Component information box title here"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            ssd: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Extra disk space"
          component="extra_ssd"
          infoTitle="Component information box title here"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            extra_ssd: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Cooler"
          component="cooler"
          infoTitle="Mikä on suoritin?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            cooler: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Extra fans"
          component="extra_fans"
          infoTitle="Component information box title here"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            extra_fans: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Cabling"
          component="cable"
          infoTitle="Component information box title here"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            cable: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Power supply"
          component="psu"
          infoTitle="Mikä on suoritin?"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            psu: product
          }))}
          selections={selected}
        />
        <ComponentSelect
          title="Operating system"
          component="os"
          infoTitle="Component information box title here"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            os: product
          }))}
          selections={selected}
        />
        <ComponentMultiSelect
          title="Services and extras"
          component="services"
          infoTitle="Component information box title here"
          infoText="Here would be a description what a this product category (what the component does). I will write them when I release the website for real use."
          setSelected={(product: any) => setSelected((selected) => ({
            ...selected,
            services: product
          }))}
          selections={selected}
        />
        <div className="py-5" />
        <Overview selected={selected} />
        {/*
        <ProductTabs product={product} />*/}
      </div>
      {/*<MobileActions product={product} show={!inView} />*/}
    </>
  )
}

export default DesignerTemplate
