export const selectApplications = (state) => state.applications.applications[0];
export const selectApplicationsStatus = (state) => state.applications.status;
export const selectPriorities = (state) => state.priorities.prioritiesArr;

export const selectApplicationById = (state, id) => {
  return JSON.stringify(
    state.applications.applications[0].find(
      (application) => Number(application.id) === Number(id)
    )
  );
};
