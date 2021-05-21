import { updateQuestion } from './../../utility/updateQuestion';
import { generateQuestionTemplate } from './../../utility/generateQuestionTemplate';
import { getQuestionByIdQuery } from './../../models/queries/getQuestionByIdQuery';
import axios from "axios";
import { bolt } from "@bin/bolt";
import { storeAnswerQuery } from "@models/queries";

const ListenUserAction = () => {
  const actionId = process.env?.ACTION_ID;
  if (actionId) {
    bolt.action(
      actionId,
      async ({ ack, payload, body, client, context, action }) => {
        // console.log({ payload, body, context, action });
        await ack();
        const { user: { id: userId }, response_url, } = body;
        if (action.type === "button") {
          const { value } = action;
          const { id: optionId, questionId } = JSON.parse(value);
          try {
            await storeAnswerQuery({ userId, optionId, questionId });
            const question = await getQuestionByIdQuery({ questionId: questionId });
            if (question) {
              const updatedTemplate = generateQuestionTemplate(question);
              const renderedTemplate = await updateQuestion({ url: response_url, blocks: updatedTemplate.blocks, text: "" });
            }
          } catch (error) {
            
          }
        }
      }
    );
  }
};
export default ListenUserAction;

