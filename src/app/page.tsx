'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCustomerStore } from '@/stores/customerStore';
import { findAllMenusByRestaurantID } from '@/services/menu/findAllMenuByRestaurantID';

export default function Page() {
	const params = useSearchParams();
	const setIds = useCustomerStore((s) => s.setIds);
	const { restaurantId, tableId, customerId } = useCustomerStore();

	// const [hydrated, setHydrated] = useState(false);
	// const [menus, setMenus] = useState<any[]>([]);
	// const [loading, setLoading] = useState(true);
	// const [error, setError] = useState<string | null>(null);

	// useEffect(() => {
	// 	setHydrated(true);
	// }, []);

	useEffect(() => {
		// if (!hydrated) return;

		const restaurant_id = params.get('restaurant_id');
		const table_id = params.get('table_id');
		const customer_id = params.get('customer_id');

		if (restaurant_id && table_id && customer_id) {
			setIds(restaurant_id, table_id, customer_id);
		}
	}, [params, setIds]);

	// useEffect(() => {
	// 	if (!hydrated || !restaurantId) return;

	// 	const fetchMenus = async () => {
	// 		try {
	// 			const data = await findAllMenuByRestaurantID(restaurantId);
	// 			setMenus(data);
	// 		} catch (err) {
	// 			setError('Failed to fetch menus');
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchMenus();
	// }, [hydrated, restaurantId]);

	// if (!hydrated) return null;
	// if (loading) return <div>Loading menus...</div>;
	// if (error) return <div>{error}</div>;

	return (
		<div>
			<span className="font-itim">
				Welcome {customerId} to {tableId} on {restaurantId}
			</span>
		</div>
	);
}
