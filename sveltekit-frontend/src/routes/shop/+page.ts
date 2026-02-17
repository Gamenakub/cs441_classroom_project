import type { PageLoad } from './$types';

export const ssr = false; // ปิด SSR (จำเป็น)

                                      // รับ data ที่มาจาก +page.server.ts
export const load: PageLoad = async ({ data }) => {
    const { rate } = data;

    const calculateFinalPrice = (price: number) => {
        const discount = price * rate;
        return price - discount;
    };

    return {
        ...data,
        calculateFinalPrice     // ส่ง function ไปให้ +page.svelte
    };
}