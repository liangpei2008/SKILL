const titles = {
  dashboard: "工作台",
  list: "业务列表",
  detail: "业务详情",
  approval: "审批处理",
};

function showView(viewName) {
  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === viewName);
  });

  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === viewName);
  });

  document.querySelector("#view-title").textContent = titles[viewName] || "业务原型";

  const url = new URL(window.location.href);
  url.searchParams.set("view", viewName);
  window.history.replaceState({}, "", url);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-view]");
  if (target) {
    showView(target.dataset.view);
  }
});

document.querySelector("#create-record").addEventListener("click", () => {
  showView("detail");
});

document.querySelector("#approve").addEventListener("click", () => {
  document.querySelector("#feedback").textContent = "已通过，业务状态更新为进行中。";
});

document.querySelector("#reject").addEventListener("click", () => {
  document.querySelector("#feedback").textContent = "已驳回，业务状态退回至提交人修改。";
});

const initialView = new URLSearchParams(window.location.search).get("view");
showView(Object.hasOwn(titles, initialView) ? initialView : "dashboard");
