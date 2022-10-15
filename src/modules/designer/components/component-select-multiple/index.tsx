import { useGetDesignerOptions } from "@lib/hooks/use-layout-data";
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview";
import ComponentOption from "../component-option";
import Carousel from 'react-grid-carousel';
import { useEffect, useState } from "react";
import Info from "@modules/common/icons/info";
import { Dialog } from "@headlessui/react";
import X from "@modules/common/icons/x";
import ComponentOptionMultiple from "../component-option-multiple";
import { DesignerItem } from "@modules/designer/templates";
import parseDesignerData from "@lib/util/parse-data";
import { ProductPreviewType } from "types/global";
import { Product } from "@medusajs/medusa";

const ComponentMultiSelect = ({ component, title, infoTitle, infoText, setSelected: setParentSelected, selections }: { component: string; title: string; infoTitle: string; infoText: string; setSelected: any; selections: {
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
} }) => {
  const { data }: any = useGetDesignerOptions(component);
  const [selected, setSelected] = useState<{ index: number; multiIndex?: number; }[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const newSelected = (data || []).map((val: any, index: number) => {
      return parseDesignerData(val.product.subtitle || '').forced ? { index, multiIndex: 0 } : null
    })
    .filter((i: any) => i !== null) as any
    setSelected(newSelected);
    setParentSelected(newSelected.map((item: any) => Array.isArray((data || [])[item.index]) ? ((data || [])[item.index] as any)[item.multiIndex || 0] : (data || [])[item.index]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setParentSelected(selected.map((item) => Array.isArray((data || [])[item.index]) ? ((data || [])[item.index] as any)[item.multiIndex || 0] : (data || [])[item.index]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, data]);

  const getProduct = (product: any) => Array.isArray(product) ? product[0] : product;

  const isNotCompatible = (product: (ProductPreviewType & {
    calculated_price: number;
    product: Product;
  })) => {
    const data = parseDesignerData(getProduct(product).product.subtitle || '');
    switch (component) {
      case 'mobo':
        const data2 = parseDesignerData(selections.processor?.product.subtitle || '');
        if (data.socket && data2.socket && data.socket !== data2.socket) {
          return true;
        }
        break;
      case 'cooler':
        const data3 = parseDesignerData(selections.processor?.product.subtitle || '');
        if (data.socket && data3.socket && (Array.isArray(data.socket) ? !data.socket.includes(data3.socket) : data.socket !== data3.socket)) {
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  return (
    <>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <div className="fixed inset-0" style={{ backgroundColor: '#000000CC' }} aria-hidden="true" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Dialog.Panel
                  className="w-full max-w-4xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                  style={{
                    backgroundColor: 'rgb(30 41 59)'
                  }}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-extrabold leading-6 text-white"
                  >
                    {infoTitle}
                  </Dialog.Title>
                  <div className="mt-2">
                    {infoText.split('\\n').map((i, index) => (
                      <div key={index}>
                        <p className="text-sm text-white">
                          {i}
                        </p>
                        {index !== (infoText.split('\\n').length - 1) && <br />}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <X /> Close
                    </button>
                  </div>
                </Dialog.Panel>
            </div>
          </div>
      </Dialog>
      <div className="flex justify-center gap-4">
        <h2 className="text-5xl font-extrabold text-center antialiased" style={{ fontFamily: "'Rubik', sans-serif", fontWeight: 800 }}>{title}</h2>
        <button onClick={() => setIsOpen(true)}>
          <Info color="#1cc1eb" size={48} />
        </button>
      </div>
      <div className="my-10"></div>
      <Carousel
        cols={4}
        rows={1}
        gap={10}
        loop
        hideArrow={(data?.length || 0) < 5}
      >
        {data
            ? data.map((product: any, index: number) => (
                <Carousel.Item key={product.id}>
                  <div className="flex justify-center">
                    <div style={{ width: '90%' }}>
                      { Array.isArray(product) ? 
                        (
                          <ComponentOptionMultiple
                            options={product.map((p) => ({
                                floatPrice: p.calculated_price,
                                material: p.product.material,
                                ...p
                            }))}
                            highlighted={selected.map((i) => i.index).includes(index)}
                            selected={(data || [])[0]}
                            onClick={() => {
                              setSelected((selected) => {
                                if (parseDesignerData(data[index].product.subtitle || '').forced) {
                                  return selected;
                                }
                                const array = [...selected];
                                if (array.map(i => i.index).includes(index)) {
                                  array.splice(array.map(i => i.index).indexOf(index), 1);
                                } else {
                                  array.push({ index })
                                }
                                return array;
                              })
                            }}
                            setMultiIndex={(multiIndex: number) => {
                              setSelected((selected) => {
                                const array = [...selected];
                                if (array.map(i => i.index).includes(index)) {
                                  array[array.map(i => i.index).indexOf(index)] = { ...array[array.map(i => i.index).indexOf(index)], multiIndex }
                                }
                                return array;
                              })
                            }}
                            notCompatible={isNotCompatible(product[0])}
                          />
                        ) : (
                            <ComponentOption
                              {...product}
                              highlighted={selected.map((i) => i.index).includes(index)}
                              selected={(data || [])[0]}
                              onClick={() => {
                                setSelected((selected) => {
                                  if (parseDesignerData(data[index].product.subtitle || '').forced) {
                                    return selected;
                                  }
                                  const array = [...selected];
                                  if (array.map(i => i.index).includes(index)) {
                                    array.splice(array.map(i => i.index).indexOf(index), 1);
                                  } else {
                                    array.push({ index })
                                  }
                                  return array;
                                })
                              }}
                              material={product.product.material}
                              floatPrice={product.calculated_price}
                              notCompatible={isNotCompatible(product)}
                            />
                          )}
                    </div>
                  </div>
                </Carousel.Item>
              ))
            : Array.from(Array(4).keys()).map((i) => (
                <Carousel.Item key={i}>
                  <SkeletonProductPreview />
                </Carousel.Item>
              ))}
              <Carousel.Item>

              </Carousel.Item>
      </Carousel>
      <div className="my-10"></div>
    </>
  )
}

export async function getStaticProps() {
  return { props: {  } }
}


export default ComponentMultiSelect;