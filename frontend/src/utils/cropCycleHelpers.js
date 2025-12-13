
export const parseDuration = (durationStr) => {
  const match = durationStr.match(/(\d+)[-–](\d+)/);
  if (match) {
    return { min: parseInt(match[1]), max: parseInt(match[2]) };
  }
  // Fallback for single number
  const single = durationStr.match(/(\d+)/);
  if (single) {
    const num = parseInt(single[1]);
    return { min: num, max: num };
  }
  return { min: 0, max: 0 };
};

export const getDaysSincePlanting = (plantingDate) => {
  const now = new Date();
  const planted = new Date(plantingDate);
  const diffTime = Math.abs(now - planted);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const mapStageStatus = (growthStages, daysSincePlanting) => {
  let cumulativeDays = 0;
  const stagesWithStatus = [];

  for (let i = 0; i < growthStages.length; i++) {
    const stage = growthStages[i];
    const duration = parseDuration(stage.durationDays);
    const stageStart = cumulativeDays;
    const stageEnd = cumulativeDays + duration.max;

    let status = 'locked';
    let daysIntoStage = 0;
    let daysRemaining = 0;

    if (daysSincePlanting >= stageEnd) {
      status = 'completed';
    } else if (daysSincePlanting >= stageStart && daysSincePlanting < stageEnd) {
      status = 'active';
      daysIntoStage = daysSincePlanting - stageStart;
      daysRemaining = stageEnd - daysSincePlanting;
    }

    stagesWithStatus.push({
      ...stage,
      status,
      stageStart,
      stageEnd,
      daysIntoStage,
      daysRemaining,
      durationRange: duration,
    });

    cumulativeDays = stageEnd;
  }

  return stagesWithStatus;
};

export const getActiveStage = (stagesWithStatus) => {
  return stagesWithStatus.find((s) => s.status === 'active') || null;
};

export const getSeasonProgress = (daysSincePlanting, seasonLengthDays) => {
  const duration = parseDuration(seasonLengthDays);
  const maxDays = duration.max;
  const progress = Math.min((daysSincePlanting / maxDays) * 100, 100);
  return Math.round(progress);
};

export const getHarvestWindow = (plantingDate, seasonLengthDays) => {
  const duration = parseDuration(seasonLengthDays);
  const planted = new Date(plantingDate);
  
  const minDate = new Date(planted);
  minDate.setDate(minDate.getDate() + duration.min);
  
  const maxDate = new Date(planted);
  maxDate.setDate(maxDate.getDate() + duration.max);
  
  return {
    minDate: minDate.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }),
    maxDate: maxDate.toLocaleDateString('en-KE', { month: 'short', day: 'numeric' }),
  };
};


export const checkWeatherCondition = (currentValue, idealRange) => {
  // currentValue: {temp: 22, rainfall: 450}
  // idealRange: {min: 15, max: 28}
  
  if (!currentValue || !idealRange) {
    return { status: 'unknown', message: 'No data available' };
  }

  const { min, max } = idealRange;
  
  if (currentValue >= min && currentValue <= max) {
    return { status: 'good', message: 'Conditions are ideal' };
  } else if (currentValue < min) {
    return { status: 'warning', message: `Too low (below ${min})` };
  } else {
    return { status: 'warning', message: `Too high (above ${max})` };
  }
};