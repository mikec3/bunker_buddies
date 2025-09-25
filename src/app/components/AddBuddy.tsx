import { Button } from "./ui/button";

//import { Icon } from "./Icon";
import { toast } from "sonner"

import { sendConnReq } from "./functions";

//import { createContact } from "../pages/applications/functions";

const AddBuddy = ({
  callback,
  companyId = "",
}: {
  callback: () => void;
  companyId?: string;
}) => {

const handleSubmit = async (formData: FormData) => {
  formData.append("companyId", companyId);
  console.log(formData);
  const result = await sendConnReq(formData.get("username") as string); //{success: true}//await createContact(formData);
if (result.success) {
  toast.success("Request Sent!")
  callback();
} else {
  toast.error("Error with request")
}
}

return (
  <form action={handleSubmit}>
    <div className="field">
      <label htmlFor="username">Buddy's Username</label>
      <input type="text" id="username" name="username" required />
    </div>
    <div className="field mt-7">
      <Button>
        Send Request
      </Button>
    </div>
  </form>
)
}

export { AddBuddy }