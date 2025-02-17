export const getFilteredActionsReturn = (state) => {
    if (state === 'confirmed') return {id: 'picking', title: 'Picking'};
    if (state === 'picking') return {id: 'picked', title: 'Picked'};
    if (state === 'picked') return {id: 'dispatch', title: 'Dispatched'};
    return [];
  };
