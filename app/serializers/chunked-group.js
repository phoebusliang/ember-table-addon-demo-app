import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    children: { embedded: 'always' }
  },

  keyForAttribute: function (attr, method) {
    if (method === 'deserialize') {
      var mappings = {
        "accountSection": "GL Account Section",
        "accountType": "GL Account Type",
        "accountCode": "GL Account Code",
        "glAccountDescription": "GL Account Description",
        "beginningDr": "Beginning DR (Base)",
        "beginningCr": "Beginning CR (Base)",
        "netBeginning": "Net Beginning (Base)",
        "activityDr": "Activity DR (Base)",
        "activityCr": "Activity CR (Base)",
        "netActivity": "Net Activity (Base)",
        "endingDr": "Ending DR (Base)",
        "endingCr": "Ending CR (Base)",
        "netEnding": "Net Ending (Base)"
      };
      return mappings[attr];
    }

    return attr;
  }

});
