'use client';
import { useCategoryListQuery } from '@/gql/graphql';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import './style.css';
import { isMobile } from '@/hook/isMobile';
import { SliderWrap } from '../SliderWrap';

interface Props {
  productGroup: any[];
  onSelected?: (e: any) => void;
  selected?: any;
}

export function CustomerOrderCategory(props: Props) {
  const isMobileScreen = isMobile();
  const mediaScrollRef = useRef<HTMLUListElement>();
  const [category, setCategory] = useState([]);

  useCategoryListQuery({
    onCompleted: (res) => {
      setCategory(res.categoryList.hash[0].children);
    },
  });

  useEffect(() => {
    if (process) {
      let fetchLoading = false;
      const threshold = 100;
      const onScroll = () => {
        if (mediaScrollRef?.current) {
          const diff =
            mediaScrollRef?.current?.scrollWidth -
            mediaScrollRef?.current?.scrollLeft -
            mediaScrollRef?.current.offsetWidth;

          if (diff < threshold && !fetchLoading) {
            fetchLoading = true;
          }
        }
      };
      mediaScrollRef?.current?.addEventListener('scroll', onScroll);
      return () => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        mediaScrollRef?.current?.removeEventListener('scroll', onScroll);
      };
    }
  }, []);

  return (
    <div className={'Action_slider_Wrap'}>
      <ul ref={mediaScrollRef as any} className="Action_slider gap-4">
        <SliderWrap dataLenght={category.length} disable={true}>
          <li
            className={`p-3 hover:bg-emerald-700 font-bold rounded-md cursor-pointer ml-2 ${
              props.selected === null ? 'bg-emerald-700 text-white' : ''
            }`}
            onClick={() => {
              props.onSelected && props.onSelected(null);
            }}
          >
            All
          </li>
          {category
            .filter((f: any) => props.productGroup[f.name] && props.productGroup[f.name].length > 0)
            .map((c: any) => {
              const count = props.productGroup
                ? (props.productGroup[c.name] || []).reduce((a: any, b: any) => (a = a + b.sku.length), 0)
                : 0;
              return (
                <li
                  key={c.id}
                  className={`p-3 hover:bg-emerald-700 font-bold rounded-md  cursor-pointer ${
                    props.selected && props.selected.name === c.name ? 'bg-emerald-700 text-white' : ''
                  }`}
                  onClick={() => {
                    props.onSelected && props.onSelected(c);
                  }}
                >
                  {c.name} {count > 0 ? `(${count})` : ''}
                </li>
              );
            })}
        </SliderWrap>
      </ul>
    </div>
  );
}
