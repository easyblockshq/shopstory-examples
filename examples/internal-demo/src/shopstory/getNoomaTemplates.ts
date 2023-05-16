import { ConfigComponent } from "@shopstory/core";
import { Entry, createClient } from "contentful";

type NoomaTemplate = {
  config: ConfigComponent;
  label?: string;
};

async function getNoomaTemplates(): Promise<{
  cardTemplates: Array<NoomaTemplate>;
  sectionTemplates: Array<NoomaTemplate>;
}> {
  const resultTemplates: Awaited<ReturnType<typeof getNoomaTemplates>> = {
    cardTemplates: [],
    sectionTemplates: [],
  };

  if (
    !process.env.SHOPSTORY_CONTENTFUL_SPACE_ID ||
    !process.env.SHOPSTORY_CONTENTFUL_ACCESS_TOKEN
  ) {
    return resultTemplates;
  }

  const contentfulClient = createClient({
    space: process.env.SHOPSTORY_CONTENTFUL_SPACE_ID,
    accessToken: process.env.SHOPSTORY_CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const noomaDemo = await contentfulClient.getEntries<{
      sectionTemplates?: Array<
        Entry<{ config: ConfigComponent; label?: string }>
      >;
      cardTemplates?: Array<Entry<{ config: ConfigComponent; label?: string }>>;
    }>({
      content_type: "noomaDemo",
      include: 2,
    });

    noomaDemo.items.forEach((item) => {
      item.fields.cardTemplates?.forEach((cardTemplate) => {
        resultTemplates.cardTemplates.push({
          config: cardTemplate.fields.config,
          label: cardTemplate.fields.label,
        });
      });

      item.fields.sectionTemplates?.forEach((sectionTemplate) => {
        resultTemplates.sectionTemplates.push({
          config: sectionTemplate.fields.config,
          label: sectionTemplate.fields.label,
        });
      });
    });

    return resultTemplates;
  } catch (error) {
    console.error(error);
    return resultTemplates;
  }
}

export { getNoomaTemplates };
