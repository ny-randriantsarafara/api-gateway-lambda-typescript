function generatePipeline(fields) {
  const groupStage = { _id: null };
  const projectStage = { _id: 0 };

  fields.forEach((field) => {
    const fieldParts = field.split(".");
    let currentGroup = groupStage;
    let currentProject = projectStage;

    fieldParts.forEach((part, index) => {
      if (index === fieldParts.length - 1) {
        // Handle nested fields for $group stage
        if (fieldParts.length > 1) {
          currentGroup.$addToSet = currentGroup.$addToSet || {};
          currentGroup.$addToSet[part] = `$${field}`;
        } else {
          currentGroup[part] = { $addToSet: `$${field}` };
        }
        // Handle nested fields for $project stage
        currentProject[part] = 1;
      } else {
        currentGroup[part] = currentGroup[part] || {};
        currentProject[part] = currentProject[part] || {};
        currentGroup = currentGroup[part];
        currentProject = currentProject[part];
      }
    });
  });

  return [{ $group: groupStage }, { $project: projectStage }];
}

function parseNestedFields(data) {
  const parsedData = {};

  Object.keys(data).forEach((key) => {
    if (
      Array.isArray(data[key]) &&
      data[key].length > 0 &&
      typeof data[key][0] === "object"
    ) {
      // Initialize an object to hold arrays of unique values for each nested field
      const nestedFields = {};

      data[key].forEach((item) => {
        Object.keys(item).forEach((nestedKey) => {
          if (!nestedFields[nestedKey]) {
            nestedFields[nestedKey] = new Set();
          }
          if (item[nestedKey]) {
            nestedFields[nestedKey].add(item[nestedKey]);
          }
        });
      });

      // Convert sets to arrays and assign to parsedData
      parsedData[key] = {};
      Object.keys(nestedFields).forEach((nestedKey) => {
        parsedData[key][nestedKey] = Array.from(nestedFields[nestedKey]);
      });
    } else {
      parsedData[key] = data[key];
    }
  });

  return parsedData;
}
