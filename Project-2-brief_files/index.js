import Outcome from "./elements/Outcome.js";
import Guideline from "./elements/Guideline.js";
import TaskList from "./helpers/task-list.js";
import Guidelines from "./elements/Guidelines.js";
import SortingHat from "./elements/SortingHat.js";
// Enable custom elements
customElements.define(Outcome.tagName, Outcome);
customElements.define(Guideline.tagName, Guideline);
customElements.define(Guidelines.tagName, Guidelines);
customElements.define(SortingHat.tagName, SortingHat);
// Activate helper scripts
new TaskList();
//# sourceMappingURL=index.js.map