import {
  DefineFunction,
  DefineTrigger,
  DefineWorkflow,
  Project,
  Schema,
  TriggerTypes,
} from "slack-cloud-sdk/mod.ts";

// Create the Function

const ReverseString = DefineFunction(
  "reverse",
  {
    title: "Reverse",
    description: "Takes a string and reverses it",
    input_parameters: {
      stringToReverse: {
        type: Schema.types.string,
        description: "The string to reverse",
      },
    },
    output_parameters: {
      reverseString: {
        type: Schema.types.string,
        description: "The string in reverse",
      },
    },
  },
  async ({ inputs, env }) => {
    console.log(`reversing ${inputs.stringToReverse}.`);
    console.log(`SLACK_API_URL=${env["SLACK_API_URL"]}`);

    const reverseString = inputs.stringToReverse.split("").reverse().join("");
    return await {
      outputs: { reverseString },
    };
  },
);

// Create the Workflow

export const ReverseEchoString = DefineWorkflow("reverse_echo", {
  title: "Reverse, echo",
  description: "Reverses a string, echos it out",
  input_parameters: {
    stringToReverse: {
      type: Schema.types.string,
      description: "The string to reverse",
    },
    channel: {
      type: Schema.slack.types.channel_id,
      description: "Channel to echo the reversed string",
    },
  },
});

const reverseStep = ReverseEchoString.addStep(ReverseString, {
  stringToReverse: ReverseEchoString.inputs.stringToReverse,
});

ReverseEchoString.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ReverseEchoString.inputs.channel,
  message: `Your string in reverse is *${reverseStep.outputs.reverseString}*`,
});

// Set up a Shortcut Trigger

export const ReverseEchoShortcut = DefineTrigger("reverse_echo_shortcut", {
  type: TriggerTypes.Shortcut,
  name: "Reverse",
  description: "Reverses a string and echoes it in-channel",
})
  .runs(ReverseEchoString)
  .withInputs((ctx) => ({
    channel: ctx.data.channel_id,
  }));

// Create the Project

Project({
  name: "reverse",
  description:
    "A demo showing how to use Slack workflows, functions, and triggers",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: ["commands", "chat:write", "chat:write.public"],
  functions: [ReverseString],
  workflows: [ReverseEchoString],
  triggers: [ReverseEchoShortcut],
  tables: [],
  outgoingDomains: [],
});
